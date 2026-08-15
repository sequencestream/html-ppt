# DeepSeek Harness：从 Coding Agent 到可组合 Agent Runtime — PPT 分页大纲

本文件逐页记录 PPT 的标题、页面内容与讲解重点，供后续生成 HTML Deck 使用。

- **使用场合**：技术分析
- **表达风格**：专业、严谨、克制
- **叙事主线**：Harness 成为竞争焦点 → DeepSeek Harness 的定位 → Cordis 的时空可组合性 → Runtime 的关键机制 → 竞品关系 → 企业采用 → 趋势判断
- **核心结论**：DeepSeek Harness 的关键价值不是“插件更多”，而是尝试建立一套可动态重组、可撤销、可回放的 Agent Runtime。
- **信息分层**：`当前实现` 表示源码或文档已有能力；`架构推断` 表示基于设计做出的判断；`趋势预测` 表示尚未承诺的未来方向。

---

## 第 01 页 · 封面 / 核心判断

- **眉题**：DEEPSEEK HARNESS / TECHNICAL ANALYSIS
- **主标题**：DeepSeek Harness
- **副标题**：从 Coding Agent 到可组合 Agent Runtime
- **核心判断**：
  > 它的目标不是只做一个对标 Claude Code 或 Codex 的 Coding Agent，而是以 Coding Agent 为首个应用，向下抽象出一个可动态重组的 Agent Runtime。
- **关键问题**：插件在运行中加入、退出或被替换时，如何撤销副作用、协调依赖关系，并保持会话可回放？
- **资料范围**：Developer Preview、Cordis 源码与时空可组合性预印本；分析基准时间为 2026-08-14。

**讲解要点**：开场先排除“又一个 Coding Agent”的表层理解。整场分析围绕 Runtime 是否具备可组合、可恢复、可审计的能力展开。

---

## 第 02 页 · 市场背景 / 模型之外的新竞争层

- **标题**：模型决定能力上限，Harness 决定能否稳定接近上限
- **Agent Harness 的职责**：
  - 组装 system prompt、历史消息、Skills 与工具 schema；
  - 驱动“模型请求 → 工具调用 → 结果回填 → 下一步请求”循环；
  - 管理文件、Shell、浏览器、MCP、数据库等执行环境；
  - 处理权限、sandbox、超时、重试、压缩、持久化与恢复；
  - 支持 subagent、并行任务、Human-in-the-loop、trace、eval 与 UI。
- **三项市场驱动力**：
  1. 多模型 tool use 与 coding 能力趋近，差异转向上下文与执行质量；
  2. 长周期任务暴露状态一致性、恢复、权限和错误归因问题；
  3. 企业需要按部门、数据域和风险等级组合不同能力与策略。
- **结论条**：行业焦点正从 Prompt Engineering、Context Engineering 继续移动到 **Harness Engineering**。

**讲解要点**：同一模型放入不同 Harness，成功率、成本、速度和安全性会显著不同；因此 Harness 已成为独立的系统工程对象。

---

## 第 03 页 · 市场地图 / 四类参与者

- **标题**：DeepSeek Harness 处在 Coding Agent 与 Agent Runtime 的交界处
- **四类产品对照**：

  | 类型 | 代表 | 主要优势 | 主要约束 |
  |---|---|---|---|
  | 一体化 Coding Agent | Claude Code、Codex、Gemini CLI | 默认体验完整，模型、工具与安全策略协同优化 | 核心循环通常不能任意替换 |
  | Agent Framework | LangChain、OpenAI Agents SDK | 业务 Agent 抽象与集成生态丰富 | 产品体验和运行边界需自行装配 |
  | Agent Runtime / Platform | LangGraph Platform、云端 Runtime | Durable execution、部署、观测和治理强 | 平台约束与迁移成本较高 |
  | 开源 Coding Harness | OpenCode、Aider、SWE-agent | 可修改、可私有部署、模型灵活 | 多围绕预设核心扩展，生命周期语义不统一 |

- **定位判断**：DeepSeek Harness 从开源 Coding Harness 起步，但希望向“可编程、可重组的 Agent Runtime”延伸。
- **观察维度**：比较重点不再只是“有多少工具”，而是“核心能力能否替换、替换后状态能否保持一致”。

**讲解要点**：不要把 Framework、Runtime 与 Harness 混成同一层产品；DeepSeek Harness 的特别之处在于试图跨越 Coding Agent 和 Runtime 两层。

---

## 第 04 页 · 产品定位 / Everything is a Plugin

- **标题**：默认 Coding Agent，只是这套 Runtime 的第一位客户
- **项目自我定义**：
  - **Everything is a Plugin**；
  - 由 Cordis 时空可组合性 Meta-Framework 驱动。
- **进入统一组合模型的能力**：
  - LLM adapter；
  - tool registry 与 policy pipeline；
  - session log 与 persistence；
  - agent loop；
  - sandbox 与 approval；
  - Web UI、headless runtime 与配置系统。
- **四种 Agent Preset**：

  | Preset | 作用 | 典型用途 |
  |---|---|---|
  | `standard` | 完整 Coding Agent | 文件、Shell、搜索、Skills、计划、目标、subagent |
  | `code` | PTC / Code Mode | 用 TypeScript 组合多次工具调用，减少模型往返 |
  | `minimal` | Bash + 编辑器最小工具面 | 基准测试、低干扰运行 |
  | `cordis` | Harness 创造模式 | 检查 Runtime、实验插件、创建 Preset |

- **边界提示**：`cordis` 是高权限开发模式，不等同于已经安全实现的“自动自演化”。

**讲解要点**：Everything is a Plugin 的价值不是插件数量，而是把通常不可触碰的 Loop、Session、Persistence 等也变成可组合单元。

---

## 第 05 页 · 核心难题 / 为什么普通插件机制不够

- **标题**：真正困难的不是“加载插件”，而是“安全地换件”
- **传统插件机制未完整解决的问题**：
  1. 插件卸载后，事件监听、工具注册、timer、资源句柄能否全部撤销？
  2. 依赖服务消失或更换 provider 时，下游能否自动停用、重载并恢复？
  3. 异步初始化期间配置变化，如何防止旧结果覆盖新状态？
  4. 插件频繁变化时，能否避免重启进程和丢失 process-local state？
- **Cordis 的两个正交答案**：
  - **时间可组合性**：组件移除后，其对共享环境造成的修改可以被完整、安全地撤销；
  - **空间可组合性**：组件声明依赖，Runtime 对 provider 的出现、消失和替换做响应式协调。
- **判断条**：动态重组不是“热加载”一个动作，而是“副作用回收 + 依赖协调 + 状态一致性”的组合问题。

**讲解要点**：这一页建立 Cordis 的必要性。后两页分别解释时间可组合性与空间可组合性。

---

## 第 06 页 · Cordis 原理一 / Revertible Effects

- **标题**：副作用必须携带逆操作
- **机制**：通过 `ctx.effect(callback)` 注册 Context 内副作用；callback 返回 disposer，Cordis 记录逆操作，组件卸载时按 LIFO 顺序回收。
- **代码示意**：

  ```ts
  ctx.effect(() => {
    const timer = setInterval(refresh, 1000)
    return () => clearInterval(timer)
  })
  ```

- **设计收益**：
  - 创建与撤销逻辑位于同一局部结构，减少遗漏；
  - 父插件 teardown 可级联回收子插件资源；
  - 为 HMR、运行中换件和自修改实验建立恢复语义。
- **保证边界**：Runtime 只能追踪 disposer，不能证明 disposer 确实恢复原状态；绕过 Context 的数据库、文件或全局变量修改不会自动回滚。
- **工程要求**：外部写操作仍需事务、幂等、补偿操作和独立审计。

**讲解要点**：强调“可撤销”不是魔法回滚。Cordis 提供生命周期框架，逆操作的正确性仍是插件作者的责任。

---

## 第 07 页 · Cordis 原理二 / Reactive Coeffects

- **标题**：依赖变化，直接驱动组件生命周期
- **声明方式**：插件通过 `inject` 声明所需 service，不依赖人工安排启动顺序。
- **运行语义**：
  - 依赖齐备 → consumer 激活；
  - provider 消失 → consumer 停用；
  - provider 被替换 → consumer 重载并重新绑定；
  - provider 卸载 → 先停止对外提供服务，再等待下游 teardown，最后回收自身资源。
- **与普通 DI 的区别**：DI 多在启动时解析一次；Reactive Coeffects 把依赖解析变成持续的运行时过程。
- **统一 Context 的配套能力**：
  - `set/get`：提供与消费 service；
  - `effect/on`：注册可回收副作用；
  - `isolate`：在不同 realm 解析独立 service 实例；
  - `intercept`：叠加访问策略与调用元数据；
  - Fiber：维护 Loading、Active、Unloading、Inactive/Failed 等状态。

**讲解要点**：插件在这里不是静态安装包，而是带依赖、作用域、状态机和可逆副作用的运行时组件。

---

## 第 08 页 · 总体架构 / 四层组合模型

- **标题**：从产品入口到底层能力，全部落在 Cordis 组合图上
- **总体链路**：

  ```text
  Web UI / CLI / Python SDK / ACP
    → Gateway 与 Client Runtime
    → Profile（web / headless）
    → Bundle + cordis.patch.yml
    → Cordis Context / Loader / Fiber
    → Agent Loop / Session / Prompt / Tools / LLM
    → FS / Shell / MCP / Skills / Workflow / Subagent
    → Sandbox / Approval / Timeout / Persistence / Replay
  ```

- **四个层次**：
  1. **Profile**：可启动产品形态，如 Web 或 headless；
  2. **Bundle**：一组 Cordis 配置行与插件代码；
  3. **Agent Preset**：按 agent → preset → global 作用域组合 persona、prompt 与工具；
  4. **Plugin / Service / Event**：最小能力单元与扩展契约。
- **替换方式**：Bundle、Profile、本机配置和 CLI overlay 逐层应用；上层可按 row id 替换 filesystem、sandbox、LLM adapter 或 session backend。
- **架构判断**：仍存在最小 Cordis Runtime 与公共契约，但产品能力没有传统意义上的“特权核心”。

**讲解要点**：关键不是“没有核心代码”，而是核心产品能力都通过公开 seam 挂载，替换实现不必修改 Agent Loop。

---

## 第 09 页 · 会话模型 / Model-visible means logged

- **标题**：Append-only Event Log 是模型历史的唯一真源
- **核心不变量**：任何对模型可见的内容，都必须能够从日志重建。
- **进入日志的事件**：
  - user message、assistant chunk / message；
  - tool call / result；
  - turn / step 边界；
  - steering、compaction、审批与中断状态；
  - fork、resume 与 subagent lineage。
- **消息派生**：`deriveMessages()` 从事件日志投影模型请求，不再维护另一份可变 message array。
- **四项收益**：
  1. UI 实时流与冷启动 replay 共享同一事实源；
  2. fork、resume、subagent lineage 可按事件边界构造；
  3. 失败轨迹可审计，而不只保留最终回答；
  4. 替换持久化后端不改变对话语义。
- **代价**：事件 schema 演进必须严格；无法可靠解释的日志格式会被拒绝，而非静默忽略。

**讲解要点**：Event Sourcing 牺牲简单性，换取 replay、audit 与一致的恢复语义，是可演进 Runtime 的另一根支柱。

---

## 第 10 页 · Agent Loop / Turn、Step 与三类输入

- **标题**：把交互、介入和上下文注入拆成明确语义
- **两个执行单位**：
  - **Step**：一次模型请求，以及该响应触发的零到多个工具调用；
  - **Turn**：一次用户输入触发的完整处理，包含零到多个 Step，直到没有 continuation、steering 或待处理工作。
- **主循环**：

  ```text
  claim input → turn/start → pre-step
    → step/start → assemble prompt & tool schemas
    → LLM stream → assistant events
    → tool calls/results → next step or turn/end
  ```

- **三类固定输入语义**：
  - `followup`：排入下一个普通 Turn，并唤醒 idle Agent；
  - `steer`：在最近 Step 边界介入，运行中或 idle 均可触发；
  - `inject`：向下一次请求注入 Context，但不主动唤醒 Agent。
- **设计价值**：避免 UI 消息、后台任务结果和系统补充 Context 竞争同一模糊队列；claim、discard、splice 均有清晰事件语义。

**讲解要点**：输入语义的区分看似细节，实质决定长任务能否安全介入、恢复与回放。

---

## 第 11 页 · 工具系统 / 策略管线与确定性并发

- **标题**：工具执行不是一次函数调用，而是一条受控策略管线
- **执行流程**：

  ```text
  tools/pre-execute
    → monotonic guard
    → tools/execute
    → tools/post-execute
    → finalizeContent
    → immutable tool/result
  ```

- **可插入策略**：allow / deny / ask、sandbox、timeout、输出裁剪、审计、结果转换。
- **并发原则**：
  - 工具默认独占执行；
  - 只有显式声明 `isConcurrencySafe` 的调用进入有界并发池；
  - 模型调用顺序与结果写入顺序保持一致。
- **安全分层**：Context capability control 管理可信组件间的逻辑权限；不可信进程内代码仍需 container、microVM、WASM 或外部 sandbox。
- **结论条**：策略与工具实现解耦，使相同工具可在不同 Profile 下接受不同风险控制。

**讲解要点**：工具并发不是越多越好。默认保守、显式证明安全、结果顺序稳定，有助于降低并行执行造成的上下文不确定性。

---

## 第 12 页 · 关键能力 / 从“可修改”走向闭环

- **标题**：最值得关注的是四项能力开始形成闭环
- **能力闭环**：

  ```text
  可修改 Runtime
    → 可撤销修改
    → 依赖自动协调
    → 全轨迹可回放
    → 用 Eval 验证修改（尚待工程化）
  ```

- **代表性能力**：

  | 能力 | 当前实现 | 独特价值 |
  |---|---|---|
  | Agent-scoped composition | 每个 Preset 组合不同工具和 prompt | 同进程承载多种 Agent，避免全局污染 |
  | Capability seams | Definition / Provider / Consumer 分离 | 本地 FS 可替换为远端 sandbox，无需 fork consumer |
  | PTC / Code Mode | TypeScript `run_code` 组合多工具调用 | 降低 round-trip、token cost 与中间误差 |
  | Context management | pruning、compaction、spill、token meter | 长会话在可回放前提下控制上下文压力 |
  | Subagent / Workflow | spawn、fork、后台续跑、外部 Agent provider | 将 Claude Code、Codex 等作为可委派 worker |
  | Skills / MCP / Hooks | 扩展生态与 hook bridge | 兼容既有 Agent 能力资产 |

- **现状判断**：前四个基础环节已有实现，Eval 门禁和安全自演化仍未形成完整生产闭环。

**讲解要点**：Code Mode 把确定性的多步工具编排下沉到程序执行，模型只在需要判断时重新介入，是未来 Harness 的重要优化方向。

---

## 第 13 页 · 竞品关系 / 不是简单替代，而是扩展边界竞争

- **标题**：未来的竞争单位，可能从“哪个 Agent 最强”转向“哪个 Runtime 最会组合”
- **Claude Code**：
  - 优势：成熟 UX、Skills、Hooks、MCP、Subagent、permissions 与企业能力；
  - `dsh` 带来的压力：为 plugin 增加作用域、撤销、依赖生命周期，以及更开放的 session/replay 契约；
  - 组合关系：`dsh` 已可将 Claude Code 作为 subagent provider。
- **Codex**：
  - 优势：Skills、MCP、Plugins、sandbox/approval 与并行 agent；
  - 启示：企业可能继续要求替换 persistence、context policy、scheduler 与 worker provider；
  - 组合关系：`dsh` 已实现 Codex subagent provider 与 hook adapter。
- **LangGraph**：

  | 维度 | DeepSeek Harness / Cordis | LangGraph |
  |---|---|---|
  | 主要抽象 | Plugin、Service、Context、Fiber、Event | Node、Edge、State、Checkpoint、Thread |
  | 控制流 | 默认 Loop，可由 event/plugin 替换 | 显式或动态 StateGraph |
  | 恢复重点 | 组件生命周期 + Session Event | Node/Graph checkpoint |
  | 适用重点 | Coding Agent、可组合 Runtime | 业务 Agent、durable workflow、HITL |

- **关系判断**：Graph 可管理业务过程，Cordis 类 Runtime 可管理运行 Graph 的动态能力组件，两者更可能互补而非互斥。

**讲解要点**：不要用 feature checklist 得出“谁取代谁”。真正差异在抽象层、控制权位置与恢复粒度。

---

## 第 14 页 · 企业采用 / 机会、风险与落地路径

- **标题**：适合受控试点，不适合直接开放生产自修改
- **企业机会**：
  1. LLM adapter 降低模型锁定，按成本与数据域切换 provider；
  2. 通过 Preset、allowlist、sandbox 与 approval 组合不同风险等级 Agent；
  3. 将审批、审计、数据访问、发布流程沉淀为版本化插件；
  4. filesystem、persistence、subagent provider 可逐步替换；
  5. append-only log 提升工具调用、审批和上下文变化的审计能力。
- **主要风险与控制**：

  | 风险 | 控制措施 |
  |---|---|
  | Developer Preview、API / 日志格式可能破坏性变化 | 锁定 commit/version，建立升级回归集 |
  | 插件拥有进程内权限，存在供应链风险 | 只加载签名和审核插件，隔离 authoring 与 production profile |
  | disposer 无法覆盖任意外部副作用 | 事务、幂等、补偿操作、独立审计 |
  | 能力图、realm、event schema 增加系统复杂度 | 插件模板、依赖图、架构守则、契约测试 |
  | capability control 不能隔离恶意进程内代码 | 使用进程、容器、WASM 或 VM 外部隔离 |

- **推荐落地顺序**：测试仓库试点 → 最小 Profile → 企业策略插件 → Harness Eval → 故障注入 → 最后评估 Creator / 自修改。

**讲解要点**：企业真正需要的不是“会自我修改的 Agent”，而是一条可验证、可晋级、可回滚的 Harness 交付流水线。

---

## 第 15 页 · 结论与趋势 / Agent Runtime 成为独立工程对象

- **标题**：未来领先的 Agent 系统，要能安全演进自己的 Harness
- **三层综合评价**：
  1. **产品层**：完整 Coding Agent、Web UI、SDK、Preset、Code Mode、Skills、MCP、subagent 与安全策略；
  2. **架构层**：Agent Loop、Session、Tools、LLM、Persistence 都成为可组合 plugin/service/event；
  3. **理论层**：用 reversible effects 与 reactive coeffects 解释组件如何在时间上可撤销、空间上可协调。
- **当前局限**：抽象面大、仍处 Developer Preview、插件作者责任较重；形式化可组合性不等于生产安全性。
- **趋势预测**：
  - Harness 将与模型一样拥有独立版本、benchmark、成本与安全指标；
  - 插件市场将从静态分发走向带权限、副作用、补偿和 Eval 契约的动态组件市场；
  - 自演化优先采用“生成 → shadow run → Eval → canary → promotion”，而非在线任意改写；
  - PTC、小程序或 DAG 将承担确定性执行，模型只处理分支与不确定判断；
  - session、delegation、approval、trace 与 artifact 将出现跨 Harness 互操作契约。
- **收束结论**：
  > DeepSeek Harness 尚不能证明谁会被它取代，但它已经把行业问题推进到新的层级：Agent 系统不仅要有更强模型和更多工具，还要有可组合、可恢复、可审计、可评估且能安全演进的 Runtime。

**讲解要点**：结尾回到第一页的问题——“换件后是否仍然一致、可恢复、可审计”，将其作为评价下一代 Harness 的新坐标。

---

## 备注 · 资料边界与参考来源

- **当前实现**主要依据 DeepSeek Harness 项目 README、架构文档、工具子系统文档及 Cordis 源码。
- **理论说明**主要依据《A Programming Paradigm for Spatiotemporal Composability》预印本。
- **竞品对比**依据 Claude Code、Codex、LangChain / LangGraph 的公开扩展与运行机制文档。
- **未来趋势**均为基于当前架构与市场的分析判断，不代表 DeepSeek 官方 roadmap。
- 原始分析稿中的十项参考资料应在正式 PPT 尾页或演讲配套文档中完整保留；页面正文只保留必要的来源脚注，避免影响信息密度。
