---
title: "When LLMs Develop Languages: Symbolic Communication for Efficient Multi-Agent Reasoning"
type: paper
authors:
  - Zhengqi Pei
  - Qingming Huang
  - Shuhui Wang
year: null
source_job_id: "56cc21b5-ecdf-4e7e-9c5e-39e922cf8eff"
tags:
  - llm-reasoning
  - symbolic-reasoning
  - test-time-compute
  - multi-agent-systems
  - token-efficiency
---

## TL;DR

Communicative Language Symbolism Routing (CLSR) uses frozen LLM agents to invent and evolve reusable [[concepts/language-symbolism-frameworks|Language Symbolism Frameworks]], then applies [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]] to select, ensemble, or compose them for each query. Across seven reasoning benchmarks and several open-weight backbones, the reported results usually retain roughly Raw CoT accuracy while sharply reducing generated completion tokens. The evidence concerns a latency-oriented output-token metric; the method also requires costly offline protocol discovery, reasoning exemplars, and substantial reusable prompt prefixes.

## Research Question

Can LLMs automatically develop compact, reusable symbolic protocols and route among them at test time to improve the accuracy-versus-generated-token frontier without weight updates or external program execution?

## Motivation

Chain-of-thought reasoning can improve difficult predictions but expresses intermediate computation in verbose human language. Direct brevity prompts may discard information, while program-based approaches depend on human-defined languages and external executors. CLSR instead searches for discrete protocols adapted to the model's own priors and tokenizer, retains protocols that are accurate and concise, and allocates additional calls only when the query appears to require them.

## Contributions

- Defines an LSF as a persistent card containing a symbol inventory, lightweight grammar, usage constraints, operation semantics, and an empirical accuracy-cost profile.
- Evolves LSF populations through independently sampled agents, held-out evaluation, Pareto-style selection of correct low-token traces, mutation or recombination, and elitist inheritance.
- Introduces a latent-free LLM router with single-LSF, multi-LSF aggregation, and sequential composition modes plus bounded adaptive stopping.
- Formulates routing and stopping as a finite-horizon constrained Markov decision process and derives a Fano-style lower bound relating answer uncertainty, per-token information, and expected generated length.
- Shows conditional subsumption of program-execution pipelines under an explicit interpreter-realizability assumption, rather than claiming unconditional equivalence.

## Method

### Offline Language Evolution

Training examples are divided across generations. Independently sampled black-box LLM agents first propose LSFs from exemplar question-answer traces. Candidate protocols are evaluated on the next held-out group, and correct traces with low completion-token cost are selected. The model then mutates or recombines their parent protocols, while consistently strong LSFs may survive unchanged. Each resulting LSF receives a profile covering validation accuracy, token statistics, query types, reliability, and failure modes.

The default experiments synthesize hundreds of candidates from 200-2,000 reasoning exemplars, use temperature 0.9 for synthesis and 0.3 for evaluation, and select the fifth-generation pool. The default initial population in the sensitivity study is 100. Protocol discovery takes several days on eight RTX 4090 GPUs and is intended to be amortized over repeated use.

### Online Routing and Execution

The router first narrows the LSF bank with compact category codes, then emits a structured plan. It chooses among a single direct call, parallel calls followed by aggregation, or sequential LSF composition. Plans specify selected LSFs, round structure, sample count, aggregation, and stopping rule. All generated outputs from routing, intermediate reasoning, and aggregation count toward the main cost:

$$
C=\sum_{t=1}^{T}\left(|r_t^{\mathrm{router}}|+\sum_{k\in\mathcal I_t}|r_{t,k}|\right).
$$

Easy cases commonly stop after one round; harder cases can receive up to three rounds in the reported adaptive setting. LSF cards themselves contain roughly 500-2,000 input tokens, so the appendix also reports a cache-aware token-equivalent diagnostic with separate coefficients for uncached and reusable cached input.

### Theoretical Framing

With a finite LSF pool and bounded horizon, the paper represents interactive inference as a finite constrained MDP. Occupancy-measure arguments establish existence of an optimal budget-constrained policy; scalarization yields supported points on the accuracy-cost frontier, with mixtures of two deterministic policies sufficient for intermediate constrained points.

For target error $\delta$, the information bound is

$$
\mathbb E[|\mathcal T|\mid X=x]\ge
\frac{\max\{I_{\mathrm{req}}(x,\delta),0\}}{\kappa_\theta(x)},
$$

where $I_{\mathrm{req}}$ is a Fano-derived required-information term and $\kappa_\theta(x)$ bounds information about the answer per active generated token. This motivates LSFs as attempts to increase useful information per emitted token; it does not by itself prove that the learned symbols do so.

## Experiments

The evaluation covers MMLU-Pro, GPQA-Main, GSM8K, MATH500, AIME 2021-2024, ScienceQA, and HotpotQA with LLaMA3-8B, Qwen3-8B, Qwen3-32B, and DeepSeek-R1-0528-Qwen3-8B. Baselines include Raw CoT, Chain-of-Draft, Constrained CoT, Sketch-of-Thought, Program-of-Thoughts, PAL, Plan-to-Solve, and PromptBreeder.

Across the main seven-benchmark table, CLSR generally lies near Raw CoT in accuracy while using many fewer completion tokens. Examples include Qwen3-32B on MATH500, where Raw CoT reports 89.3% at 845 tokens and CLSR 89.4% at 206; Qwen3-8B on MMLU-Pro, 60.2% at 276 versus 60.4% at 96; and the distilled DeepSeek backbone on AIME, 86.2% at 8,190 versus 82.5% at 2,979. These cases also show that token savings do not imply uniform accuracy gains.

On matched Qwen3-8B comparisons, three-round CLSR reports 94.8% on GSM8K with 214 generated tokens and 89.7% on MATH500 with 417, compared with PAL at 92.5%/148 and 88.6%/422. Default CLSR is cheaper but less accurate on GPQA than PromptBreeder: 42.6%/228 versus 46.1%/922. Program-baseline counts cover program generation but not external execution, limiting direct end-to-end cost comparisons.

Five-seed results report small standard deviations on MMLU-Pro, GPQA, and MATH500. Larger initial LSF populations improve results up to diminishing returns; deeper evolution improves the frontier before saturation. Adaptive rounds outperform fixed one-round inference on difficult tasks while avoiding three rounds on most inputs. Matched generator and inference backbones give the best accuracy, while cross-model transfer generally lowers both tokens and accuracy. Full-pool and leave-one-domain-out routing preserve most reported gains, and a small LongBench-v2 pilot is favorable but explicitly preliminary.

Cache-aware Qwen3-8B results remain favorable under the paper's reusable-prefix assumptions: on MATH500, CoT reports 86.8% with 890 token-equivalents and CLSR 86.6% with 283; on MMLU-Pro, the corresponding values are 60.5%/331 and 60.3%/121.

## Limitations

- The main metric counts generated tokens, not full latency, energy, or monetary cost. Cache-aware accounting depends on serving-specific coefficients and the assumption that large LSF prefixes can be reused.
- Offline evolution takes several days on eight RTX 4090 GPUs and uses reasoning-annotated training exemplars, making the method poorly suited to one-off queries or domains without suitable data.
- LSFs are text cards grounded in pretrained human language and notation. The experiments support automatic protocol synthesis, not language emergence independent of human priors.
- Compact traces are algorithmic artifacts, not faithful causal explanations of the model's internal computation, and may be harder for humans to audit than natural-language rationales.
- Conditional subsumption of external execution rests on interpreter realizability. It may fail for exact, long-horizon, or formally guaranteed computation, precisely where external runtimes are useful.
- Results rely on benchmark evaluators, chosen baselines, a maximum of three online rounds, and mostly short-answer reasoning tasks. The long-context evaluation is only a pilot, and coding, tools, multimodal transfer, and interactive environments remain untested.
- Cross-backbone transfer is not uniformly lossless; the observed accuracy drops suggest that evolved symbolic conventions can be model-specific.
- The supplied Markdown provides no paper-level year, venue, DOI, or arXiv identifier, so none is inferred here.

## Related Concepts

- [[concepts/language-symbolism-frameworks|Language Symbolism Frameworks]]: reusable model-generated symbolic languages with explicit grammar, semantics, constraints, and empirical profiles.
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]: query-dependent selection of protocol, parallelism, composition depth, and stopping under a compute budget.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: supplies the population of proposal, critique, mutation, and evaluation workers used during protocol evolution.
- [[concepts/latent-reasoning|Latent Reasoning]]: a contrasting approach that compresses intermediate computation into non-textual internal representations rather than shareable discrete symbols.

## Related Papers

- Wei et al. (2022), "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models": the principal verbose-reasoning reference and Raw CoT baseline.
- Xu et al. (2025), "Chain of Draft: Thinking Faster by Writing Less": a concise natural-language baseline that shortens traces without evolving a reusable symbolic protocol.
- Aytes, Baek, and Hwang (2025), "Sketch-of-Thought": a fixed family of compressed reasoning formats used as a token-reduction baseline.
- Gao et al. (2023), "PAL: Program-Aided Language Models," and Chen et al. (2023), "Program of Thoughts Prompting": external-execution comparisons motivating the interpreter-realizability analysis.
- Fernando et al. (2024), "PromptBreeder": evolves prompts, whereas CLSR claims to evolve reusable symbol systems and their routing behavior.
- Lazaridou and Baroni (2020), "Emergent Multi-Agent Communication in the Deep Learning Era": provides the broader emergent-communication framing.

[[index|Library home]]
