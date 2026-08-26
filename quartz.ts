import * as ExternalPlugin from "./.quartz/plugins"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

type ExplorerNode = {
  slugSegment?: string
}

ExternalPlugin.Explorer({
  filterFn: (node: ExplorerNode) => node.slugSegment !== "tags" && node.slugSegment !== "papers",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
