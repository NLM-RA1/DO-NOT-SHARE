import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"


import * as ExternalPlugin from "./.quartz/plugins"
import type { ExplorerOptions } from "./.quartz/plugins"
ExternalPlugin.Explorer({
  filterFn: (node) => {
    // exclude files with the tag "explorerexclude"
    return node.data?.tags?.includes("real") !== false
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()