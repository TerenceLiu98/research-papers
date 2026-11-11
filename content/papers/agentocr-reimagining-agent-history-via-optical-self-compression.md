---
title: "AgentOCR: Reimagining Agent History via Optical Self-Compression"
type: paper
authors:
  - Lang Feng
  - Fuchao Yang
  - Feng Chen
  - Xin Cheng
  - Haiyang Xu
  - Zhenglin Wan
  - Ming Yan
  - Bo An
year: null
source_job_id: "d9c4df0d-eaa9-4a93-9e36-b61897c2abd6"
tags:
  - visual-text-compression
  - agent-memory
  - reinforcement-learning
---

## TL;DR

AgentOCR renders an agent's textual interaction history into images, caches repeated segments, and learns to choose image compression alongside actions. Across ALFWorld and search-based QA, its reported memory-context token costs are less than half those of text+GRPO baselines, with modest aggregate performance losses. Compression rewards require careful scheduling: rewarding compression too frequently sharply reduces task success.

## Research Question

Can a vision-language agent use compressed images of its growing history to retain task performance while reducing context tokens and rendering overhead?

## Motivation

Accumulated observations, actions, and tool outputs increase context and KV-cache costs. Visual-text compression offers a denser history representation, but introduces rendering overhead and a readability–efficiency tradeoff that must be managed during interaction.

## Contributions

- Represents full textual interaction history as optical memory for multi-turn agents.
- Reuses content-keyed rendered segments within an episode, avoiding repeated rendering and duplicated cached pixels.
- Trains an action policy to select compression factors using a success-conditioned efficiency reward.

## Method

A deterministic renderer converts serialized observation–action records into RGB images. Newline-level segments are hashed and cached per episode; the next history image stacks their renderings in order. Only cache misses require rendering, although image assembly and model processing still involve the accumulated history.

The policy emits an action and a `<compression>` factor c ≥ 1. The next image's height and width are divided by √c, reducing area and generally visual-token count. Successful episodes receive an additional reward λ ln(c), with λ = 0.01. GRPO trains the policy; the default intermittent reward schedule uses K = 5. Section 4.3 describes the interval in training iterations, whereas Algorithm 1 expresses it using a step counter, leaving the precise scheduling unit ambiguous in the supplied text.

## Experiments

Tables 1–2 compare Qwen2.5-3B/7B-Instruct text agents with Qwen2.5-VL-3B/7B-Instruct optical agents. ALFWorld measures success rate; search QA averages exact-match scores across seven datasets. Values below are copied from the tables, with token counts representing average memory context per step.

| Task / scale | Text + GRPO score (%) | AgentOCR score (%) | Text tokens | AgentOCR tokens |
| --- | ---: | ---: | ---: | ---: |
| ALFWorld / 3B | 79.9 | 78.2 | 1.02k | 0.38k |
| ALFWorld / 7B | 81.8 | 81.2 | 0.95k | 0.43k |
| Search QA / 3B | 36.4 | 34.2 | 0.61k | 0.26k |
| Search QA / 7B | 41.9 | 40.1 | 0.73k | 0.36k |

The 7B search peak context drops from 13.84k to 2.65k tokens (80.9%). Table 3 reports rendering latency of 168.77 ms versus 3509.39 ms without caching (20.79× faster); peak cache storage is 110.80 MB versus 151.41 MB for incremental caching. These are rendering and cache measurements, not end-to-end inference speedups.

In the 3B ALFWorld ablation (Table 4), fixed optical history with RL achieves 78.4% success at 458.1 visual tokens. Self-compression with K = 5 reaches 78.2% at 381.7 tokens; K = 1 drives average compression to 4.91 and lowers success to 45.3%. Fixed-factor experiments show that aggressive downsampling is especially harmful to text-dense search QA.

## Limitations

Evaluation covers two task families and one VLM family. Rendering sensitivity and native multimodal histories are not systematically tested. Text and optical conditions use different model variants and prompt limits, so comparisons do not isolate representation alone. Token savings do not establish total runtime or energy savings.

The supplied prose overgeneralizes some results: 3B search retains about 94.0% of baseline performance, below the headline 95%; 3B ALFWorld loses 1.7 percentage points, exceeding the stated one-point margin. Table 4 lists 78.4% for the fixed optical baseline, while the accompanying prose says 78.5%. The summary uses table values. Publication year and a paper identifier are not explicitly supplied; the year is therefore left unknown.

## Related Concepts

- [[concepts/visual-text-compression|Visual-Text Compression]]: the representation underlying optical agent history.

## Related Papers

- [[papers/glyph-scaling-context-windows-via-visual-text-compression|Glyph]]: cited prior work on rendered long-context inputs; AgentOCR extends optical compression to evolving interaction histories and policy-selected fidelity.

[Code repository](https://github.com/langfengQ/AgentOCR) (reported in the supplied manuscript).

[[index|Library home]]
