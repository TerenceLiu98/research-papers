---
title: "Eco3S: Complex Socio-Economic System Simulation via Agent-Based Models"
type: paper
authors:
  - Shaopeng Wei
  - Yufei Cheng
  - Wenxi Sun
  - Yepeng Ding
  - Yu Zhao
  - Gang Kou
year: null
source_job_id: "ea31900f-038f-4c0e-b27e-1d1992833658"
tags:
  - llm-agents
  - agent-based-models
  - economic-simulation
  - social-simulation
  - causal-simulation
---

## TL;DR

Eco3S is an LLM-based socio-economic simulation framework that couples heterogeneous agents to evolving physical, social, and economic environments, replays saved states under interventions, and uses a Simulation-Analysis-Refinement loop to generate and revise simulations from natural-language requirements. Across three manually configured studies and four automatically generated scenarios, it reproduces several reported qualitative patterns and some close quantitative comparisons. The evidence establishes an expressive simulation workflow, but does not by itself validate its agent behavior or counterfactual outputs as estimates of real populations or policies.

## Research Question

Can a reusable LLM-driven agent-based framework model feedback between agents and changing environments, support intervention-based comparisons, and automate the construction and refinement of socio-economic simulations?

## Motivation

Many LLM social simulations use scenario-specific architectures or treat the physical environment as a static backdrop. That limits their ability to represent feedback in which infrastructure, labor markets, social relations, and agent decisions alter one another over time. Eco3S targets this gap while also adding checkpoint-based interventions and an automated workflow for turning research requests into executable simulation projects.

## Contributions

- A co-evolving environment design in which agent actions and physical, social, and economic state transitions update one another.
- Structural Causal Simulation, which saves a common simulation state and resumes it under modified parameters, policies, or prompts for trajectory comparisons.
- A Simulation-Analysis-Refinement (SAR) workflow that delegates requirements, design, implementation, execution, diagnosis, and repair to four specialized LLM agents while allowing human feedback.
- Evaluations spanning historical economic studies, information diffusion, baseline and ablation comparisons, multiple LLM backends, population scaling, and automatically generated economic scenarios.

## Method

### Co-evolving simulation

The configuration layer defines heterogeneous agent profiles, dynamic states, short- and long-term memory, action spaces, environmental components, and interaction rules. The environment combines climate and geography, a dynamic heterogeneous information network, and local labor markets. At each step, agents respond to peers and environmental conditions while aggregate actions modify infrastructure, migration, employment, and social state. Auto-analysis produces statistics, visualizations, and narrative reports from the resulting trajectories.

### Counterfactual replay

Structural Causal Simulation stores checkpoints of agent and environment state. A researcher can resume the same baseline state after changing environmental parameters, policies, or prompts, then compare the resulting trajectories. In the Canal Decay case, the paper evaluates efficient maintenance, removal of climate shocks, and removal of sea transport through relative changes in peak intensity, duration, and outcome ratio.

### Simulation-Analysis-Refinement

SAR uses a ProjectMasterAgent to formalize and orchestrate a request, a SimArchitectAgent to specify entities and modules, a CodeArchitectAgent to generate code, configuration, and prompts, and a ResearchAnalystAgent to compare outputs with expected trends. Runtime failures trigger code or configuration repair; unsatisfactory results trigger diagnostic-guided parameter or prompt revisions. The search stops when results are judged plausible or after at most ten iterations, and the authors report convergence within five iterations in their experiments.

## Experiments

### Established-study replications

The Canal Decay experiment links declining Grand Canal navigability to transport costs, employment, migration, satisfaction, policy, and rebellion. Across five runs, canal-adjacent towns have a reported rebellion rate of $0.54 \pm 0.12$, versus $0.24 \pm 0.13$ elsewhere, a 125% increase compared with the cited empirical benchmark of 117%. Both town types show significantly increasing rebellion trends.

The Origins of Governance scenario models climate, river maintenance, taxation, employment, and residents' choices among state affiliation, farming, and migration. Coordinated maintenance preserves navigability while urban population grows, reproducing the proposed direction of the cited cooperative state-formation mechanism.

The Information Propagation experiment reconstructs a $2 \times 2$ design crossing broadcasting versus seeding with common versus non-common knowledge. Common knowledge raises conversations under seeding by 773.7% and lowers them under broadcasting by 64.6%; the latter is close to the cited field decrease of 63%. Knowledge and choice-quality effects have the same reported directions as the field study, but substantially different magnitudes in several cells.

### Interventions, baselines, and ablations

In Canal Decay replay, removing sea transport has the largest reported reduction in peak intensity (-0.296), duration (-0.205), and ratio (-0.120), exceeding the effects of efficient maintenance or removing climate shocks. Compared with YuLan-OneSim, GenSim, and Vensim PLE in a 2,000-agent, ten-year setup, Eco3S produces stronger coupling among navigability, unemployment, satisfaction, and rebellion. Ablations attribute different trajectory changes to government deliberation, LLM reasoning, and the heterogeneous information network, including the negative finding that removing deliberation lowers rebellion while worsening unemployment and satisfaction because stronger control suppresses unrest.

### Automated scenarios and scaling

Four SAR-generated scenarios reproduce financial herding, satisfaction-loyalty hysteresis, an asset bubble, and Schelling segregation. Reported examples include a 167% increase in average holdings, an asset-price increase from 1.58 to 4.60 despite declining fundamental value, and an increase in the segregation index from 0.29 to 0.74.

Population experiments range from 100 to 10,000 agents. A 10,000-agent, five-step Canal Decay run takes 1:22:50.6, while 2,000-agent, ten-step runs take 30:56.2 for Canal Decay and 39:05.1 for Origins of Governance. Most tested LLM backends yield similar qualitative Canal Decay trends, but Qwen3-8B produces higher and less consistent rebellion trajectories, showing that outcomes remain sensitive to the cognitive model.

## Limitations

- The authors identify LLM reasoning as a black box and propose stronger transparency methods as future work.
- The environment represents climate and river systems but omits richer geography and infrastructure such as transportation networks, mountains, and natural-resource distributions.
- Validation without historical benchmarks remains unresolved. The paper proposes cross-configuration convergence and adversarial criticism, but does not evaluate them here.
- Matching qualitative trends or selected aggregate effects does not establish individual behavioral fidelity. The model-dependent Qwen3-8B result further limits claims of backend-independent behavior; see [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- Checkpoint replay controls the simulator's starting state, but credible real-world causal interpretation still depends on the correctness of the encoded mechanisms and intervention assumptions. The reported relative effects are simulation outputs rather than independently validated policy effects.
- Several information-delivery effects match the field study in direction but not magnitude, including the much larger conversation response under seeding. The manually configured studies use five independent runs, and the supplied text does not report broader sensitivity analysis for every scenario.
- External LLM rate limits dominate practical throughput, and automated refinement multiplies single-run cost by the number of iterations.
- The supplied Markdown states no publication year, venue, DOI, arXiv identifier, or public artifact URL, so these metadata remain unspecified.

## Related Concepts

- [[concepts/hybrid-llm-agent-based-simulation|Hybrid LLM Agent-Based Simulation]]: combines language-model decisions with explicit environmental and social transition mechanisms.
- [[concepts/economic-world-models|Economic World Models]]: situates Eco3S's endogenous action-environment feedback within executable economic systems.
- [[concepts/bilevel-simulator-construction|Bilevel Simulator Construction]]: provides a related approach to automated simulator generation and iterative calibration, while separating structural search from parameter optimization more explicitly.
- [[concepts/llm-multi-agent-systems|LLM Multi-Agent Systems]]: covers the role-specialized orchestration used by SAR.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes internally plausible simulated patterns from validated population behavior.

## Related Papers

- [[papers/from-economic-agents-to-agentic-economies-a-systems-blueprint-for-economic-world-models|From Economic Agents to Agentic Economies]] offers a broader architecture and capability taxonomy for closed economic worlds; Eco3S supplies a concrete LLM-based simulation framework and experiments.
- [[papers/gplab-a-generative-agent-based-framework-for-policy-simulation-and-evaluation|GPLab]] also combines LLM agents with modular social subsystems for policy simulation, but focuses on configured policy scenarios rather than checkpoint replay and automated simulator construction.
- [[papers/socia-evo-automated-simulator-construction-via-dual-anchored-bi-level-optimization|SOCIA-EVO]] automates simulator construction through separate structural revision and numerical calibration loops, providing a comparison to SAR's diagnostic-guided code, configuration, and prompt refinement.
- Cao and Chen (2022), "Rebel on the Canal: Disrupted Trade Access and Social Conflict in China, 1650-1911," supplies the empirical benchmark for the Canal Decay experiment.
- Allen, Bertazzini, and Heldring (2023), "The Economic Origins of Government," motivates the governance experiment.
- Banerjee et al. (2024), "When Less Is More: Experimental Evidence on Information Delivery During India's Demonetisation," supplies the field design and directional benchmarks for information propagation.

[[index|Library home]]
