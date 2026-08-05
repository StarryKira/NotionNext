import { NotionAPI as NotionLibrary } from 'notion-client'
import BLOG from '@/blog.config'
import path from 'path'
import { RateLimiter } from './RateLimiter'
import {
  getNotionBuildRateMaxPerMinute,
  getNotionBuildRateMinIntervalMs,
  logBuildEnvSummary
} from '@/lib/build/buildEnv'

// 限流配置，打包编译阶段避免接口频繁，限制频率
const useRateLimiter = process.env.BUILD_MODE || process.env.EXPORT
const lockFilePath = path.resolve(process.cwd(), '.notion-api-lock')
const rateLimiter = new RateLimiter(
  getNotionBuildRateMaxPerMinute(),
  lockFilePath,
  getNotionBuildRateMinIntervalMs()
)
if (useRateLimiter) {
  logBuildEnvSummary()
}

const globalStore = { notion: null, inflight: new Map() }

function getRawNotion() {
  if (!globalStore.notion) {
    globalStore.notion = new NotionLibrary({
      apiBaseUrl: BLOG.API_BASE_URL || 'https://www.notion.so/api/v3',
      activeUser: BLOG.NOTION_ACTIVE_USER || null,
      authToken: BLOG.NOTION_TOKEN_V2 || null,
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // notion-client 7.x 底层已从 ky 换成 ofetch，构造函数只识别 ofetchOptions；
      // 此前这里传的是 kyOptions，会被静默丢弃，等于没有配置。
      // （原先 kyOptions 里那个把 syncRecordValues 重写为 syncRecordValuesMain 的
      // 钩子也已无必要：notion-client 7.10.0 本身就直接请求 syncRecordValuesMain。）
      ofetchOptions: {
        headers: {
          'User-Agent': BLOG.NOTION_USER_AGENT
        }
      }
    })
  }
  return globalStore.notion
}

async function callNotion(methodName, ...args) {
  const notion = getRawNotion()
  const original = notion[methodName]
  if (typeof original !== 'function') throw new Error(`${methodName} is not a function`)

  const key = `${methodName}-${JSON.stringify(args)}`

  if (globalStore.inflight.has(key)) return globalStore.inflight.get(key)

  // 注意：原函数已返回 Promise，不需要再 async 包一层
  const execute = () => original.apply(notion, args)
  const promise = useRateLimiter
    ? rateLimiter.enqueue(key, execute)
    : Promise.resolve().then(execute)

  globalStore.inflight.set(key, promise)
  // 始终把 inflight 清掉；即便上层不消费 reject 也不抛 unhandledRejection
  promise
    .catch(() => {})
    .finally(() => globalStore.inflight.delete(key))
  return promise
}

export const notionAPI = {
  getPage: (...args) => callNotion('getPage', ...args),
  getBlocks: (...args) => callNotion('getBlocks', ...args),
  getSignedFileUrls: (...args) => callNotion('getSignedFileUrls', ...args),
  getUsers: (...args) => callNotion('getUsers', ...args),
  __call: callNotion
}

export default notionAPI
