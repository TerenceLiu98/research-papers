---
title: A collaborative agent with two lightweight synergistic models for autonomous crystal materials research
type: paper
authors:
  - Tongyu Shi
  - Yutang Li
  - Zhanyuan Li
  - Qian Liu
  - Jie Zhou
  - Wenhe Xu
  - Yang Li
  - Dawei Dai
  - Rui He
  - Wenhua Zhou
  - Jiahong Wang
  - Xue-Feng Yu
year: null
tags:
  - materials-discovery
  - llm-agents
  - tool-learning
  - reinforcement-learning
---

## TL;DR

MatBrain pairs a 30B materials reasoning model with a 14B tool-execution model, linking them through iterative interpretation and feedback. The authors report improved materials benchmarks and a computational campaign that screened 30,000 generated structures down to 38 database-novel candidates in 48 hours. Researchers selected one candidate, CoV4S8, for synthesis and electrochemical testing. The work demonstrates specialized computational assistance with experimental follow-up; physical laboratory automation remains future work.

## Research Question

Can separately trained models for crystallographic reasoning and tool orchestration jointly support structure generation, property prediction, and synthesis planning with lower inference hardware requirements than much larger general-purpose models?

## Motivation

Materials discovery requires connecting crystal geometry, computed properties, and synthesis knowledge spread across databases and literature. General language models can produce plausible text without satisfying structural constraints or calling scientific tools correctly. The paper proposes [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|decoupled scientific reasoning and tool orchestration]] to specialize these capabilities while allowing results from each to inform the other.

## Contributions

- Mat-252K-SFT aligns crystal structures, property records, and literature-derived supervision; Mat-20K-RL supplies open-ended queries for tool training.
- Mat-R1 specializes Qwen3-30B-A3B through supervised fine-tuning, while Mat-T1 specializes Qwen3-14B through reinforcement learning.
- Mat-MCP exposes materials databases, structure generators, validators, and simulation tools through a common interface. A cyclic controller alternates execution and scientific interpretation.
- Benchmark comparisons, token-entropy analyses, illustrative workflows, and a catalyst campaign assess the combined system (Sections 2.2-2.5).

## Method

**Data and analytical model.** The corpus joins Materials Project, OQMD, and ICSD records with associated literature through database identifiers and DOIs. DeepSeek-V3 generates questions and DeepSeek-R1 supplies answers; expert spot checks and automated scores above 4 on a 0-5 scale filter the examples. Mat-252K-SFT contains 250,000 training pairs and 2,000 held-out test pairs. Mat-R1 receives full-parameter SFT using this domain corpus and 173,000 scientific reasoning trajectories from open-r1/Mixture-of-Thoughts. This uses teacher-generated supervision, a form of [[concepts/knowledge-distillation|knowledge distillation]]. Training runs for two epochs on eight H800 80 GB GPUs (Sections 4.1-4.2).

**Executive model and rewards.** Mat-T1 trains with DAPO in VeRL on 20,000 queries selected from the SFT corpus, without ground-truth answer labels. Eight rollouts per prompt explore multi-turn tool trajectories. Training uses asymmetric clipping parameters of 0.2 and 0.28, no KL penalty, and one epoch on eight H800 GPUs. Its reward is

$$
R = 0.10 R_{\mathrm{turns}} + 0.30 R_{\mathrm{think}} + 0.25 R_{\mathrm{format}} + 0.35 R_{\mathrm{syntax}}.
$$

The terms reward interaction depth up to a four-turn threshold, average reasoning length via $\tanh(\bar L/500)$, reasoning-before-action formatting, and valid registered tool calls with schema-compliant parameters. These are [[concepts/execution-validity-rewards-for-tool-learning|execution-validity rewards for tool learning]] augmented by process heuristics; the objective has no explicit final scientific-answer accuracy term (Section 4.3).

**Tools and control flow.** Mat-MCP includes Materials Project/OQMD retrieval, CrystaLLM and MatterGen generation, pymatgen validation, phase diagrams, and property or simulation tools including MEGNet, CHGNet, MatterSim, FairChem, and VASP. Docker containers and Kubernetes support tool services. A LangGraph state machine passes validated Mat-T1 calls and observations to Mat-R1, which interprets results and requests further work when needed. The default iteration limit is six, after which Mat-R1 must give a best-effort answer (Sections 4.3-4.4).

## Experiments

**Materials benchmarks.** On the Mat-252K held-out set, the authors compare Mat-R1 and MatBrain with general models including GPT-5, DeepSeek-R1, and Gemini 2.5 Pro, as well as ReAct and Mat-T1 augmentation. They report that MatBrain leads across seven tasks. The supplied prose does not enumerate their exact accuracy scores. Regression against Materials Project values gives the following reported results (Section 2.2; Figure 3):

| Target | Reported $R^2$ |
| --- | --- |
| Formation energy | 0.97 |
| Energy above hull | 0.99 |
| Fermi energy | 0.84 |

These are system predictions supported by tools and database access. They should not be read as the isolated reasoning model's predictive accuracy.

**Entropy analysis.** Example trajectories show mean token entropy decreasing from 0.673 to 0.483 after analytical SFT and increasing from 0.878 to 0.974 after executive RL. With tool observations, Mat-R1's conclusion-section entropy decreases from 0.12 to 0.05. A density analysis over 200 test question-answer pairs shows a high-entropy peak around 3.3 bits for Mat-T1. The authors interpret these patterns as specialization in exploration and analytical convergence (Section 2.3; Figure 4).

**Representative tasks.** Examples include Cs2ErAgBr6 structure generation, fractional-occupancy modeling of a mixed-halide perovskite, a predicted Li2ZrCl6 hull energy of 0.028 eV/atom, and a predicted Cs2ErAgBr6 bandgap of 1.37 eV. Synthesis plans and simulated XRD fingerprints accompany these computational demonstrations (Section 2.4).

**Catalyst campaign.** Researchers assigned exploration of ternary Fe/Co/Ni-V-S systems after the system proposed a vanadium-nitrogenase-inspired direction. MatterGen generated 30,000 candidates. Composition, valence, redundancy, and geometric filters left 10,128; a hull-energy threshold of at most 0.025 eV/atom left 42. All 42 had predicted bandgaps below 2.0 eV, and a database novelty check retained 38. The authors report 48 hours for the computational generation and screening workflow (Section 2.5).

Researchers chose CoV4S8 for experimental follow-up and prepared it using the proposed synthesis protocol. XRD refinement supported a C2/m structure. Nanosheet electrodes reached a maximum reported ammonia yield of 34.6 micrograms per hour per milligram of catalyst at -0.55 V versus RHE; peak Faradaic efficiency was 4.3% at -0.35 V. The study reports negligible ammonia in argon and open-circuit controls, estimated background contamination below 3%, no detected hydrazine, five repeated cycles, and stable current over 20 hours. The yield and efficiency maxima occur at different potentials.

## Limitations

- **Autonomy and scope:** Researchers assigned the search space and selected the experimentally tested material. The other 37 database-novel candidates were not experimentally validated here. Database novelty does not establish exhaustive literature novelty, and a low predicted hull energy alone does not establish synthesizability.
- **Tool dependence and evaluation:** The authors acknowledge database quality and DFT accuracy limits. The described 2,000-example holdout does not establish separation by material identity or source document, or exclusion of evaluation answers from accessible databases. Tool-assisted results therefore do not isolate generalization to unseen materials.
- **Reward interpretation:** Longer reasoning, more turns, and valid calls can earn reward without establishing a correct scientific conclusion. The reward definition alone does not demonstrate the claimed prevention of reward hacking.
- **Entropy interpretation:** The observed token distributions differ across model sizes, training objectives, and interaction contexts. Lower entropy is evidence of greater model confidence, not independent proof of correctness; these comparisons do not establish that two models are necessary.
- **Cost and timing:** The claimed hardware reduction above 95% compares approximately USD 600,000 in cluster infrastructure with a USD 15,000 workstation, and the approximately 100-fold speedup uses a months-long traditional-workflow reference. These are author estimates rather than a matched end-to-end comparison. Both training procedures use eight H800 GPUs, and the tool platform describes cluster services; workstation inference claims do not establish total campaign resource costs. The 48 hours excludes the later physical validation.
- **Source completeness:** Supplementary tables and figures are referenced but absent from the supplied Markdown. Figure 3's caption refers to MAE while the body discusses MSE; exact error values are not transcribed. Section 4.5's electrode recipe implies about 1 mg of catalyst per electrode, but its yield calculation specifies 0.1 mg, leaving a mass-normalization inconsistency unresolved. No publication year, venue, DOI, or arXiv identifier for this paper is supplied, so none is inferred.

## Related Concepts

- [[concepts/decoupled-scientific-reasoning-and-tool-orchestration|Decoupled Scientific Reasoning and Tool Orchestration]]
- [[concepts/execution-validity-rewards-for-tool-learning|Execution-Validity Rewards for Tool Learning]]
- [[concepts/knowledge-distillation|Knowledge Distillation]]

## Related Papers

- M. Bran et al. (2024), "Augmenting large language models with chemistry tools": cited ChemCrow precedent for tool-augmented chemical research (reference 21).
- Ding et al. (2025), "SciToolAgent: a knowledge-graph-driven scientific agent for multitool integration": cited scientific-tool integration work (reference 49).
- Yu et al. (2025), "DAPO: An open-source LLM reinforcement learning system at scale": the cited optimization framework (reference 35).
- [[papers/frontis-ma1-training-an-ai4ai-model-towards-recursive-self-improvement-in-machine-learning-engineering|Frontis-MA1]] is a comparison within this library, not a citation in MatBrain: both train agents using executable environments, but Frontis-MA1 searches over programs with measured task outcomes, while Mat-T1 rewards tool-call validity and process structure.

## Source

Processed from the supplied Markdown for Cognitio job `0606f00e-e2cc-425e-ab23-411f59b0e5cb`. The manuscript lists [MAIC-SIAT/matbrain](https://github.com/MAIC-SIAT/matbrain) for code and source data; repository availability was not independently checked.

[[index|Library home]]
