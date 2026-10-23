---
title: Reliable Thinking with Images
type: paper
authors:
  - Haobin Li
  - Yutong Yang
  - Yijie Lin
  - Xiang Dai
  - Mouxing Yang
  - Xi Peng
tags:
  - multimodal-reasoning
  - thinking-with-images
  - test-time-scaling
  - uncertainty-estimation
  - adaptive-computation
---

## TL;DR

Reliable Thinking with Images (RTWI) treats errors in visual-cue acquisition and answer reasoning as a two-stage "noisy thinking" problem. It uses high-entropy textual tokens as a proxy for the reliability of each stage, filters low-reliability traces, and weights the remaining answers by total reliability and the reliability increase after acquiring visual cues. Across seven benchmarks and online and offline protocols, the paper reports gains over self-consistency and confidence-based test-time scaling while reducing generated tokens in the online setting.

## Research Question

Can [[concepts/thinking-with-images|Thinking with Images]] remain reliable when either its image-manipulation stage retrieves an irrelevant or inaccurate visual cue, or its subsequent textual reasoning misinterprets a useful cue?

## Motivation

Thinking-with-images systems interleave textual reasoning with actions such as zooming into selected regions. This can expose details hidden in a large or cluttered image, but it also creates two linked failure points: the model can manipulate the wrong region, and it can reason incorrectly after retrieving the right region. Standard test-time scaling methods generally aggregate textual reasoning traces without separately modeling these stages, so early visual errors can propagate into the final vote.

## Contributions

- Defines **Noisy Thinking** as failures in visual-cue mining, answer reasoning, or both, and analyzes how errors propagate across the two stages.
- Introduces a unified text-centric reliability score: the negative mean entropy of the top-$k$ highest-entropy tokens in each stage, avoiding a separate visual-uncertainty model.
- Filters traces using stage-specific percentile thresholds estimated from warm-up traces.
- Replaces unweighted majority voting with reliability-aware voting based on total stage reliability and the nonnegative reliability leap from mining to reasoning.
- Provides offline filtering and an online variant that stops unreliable traces early and stops sampling once weighted answer consensus reaches a threshold.

## Method

RTWI samples multiple interleaved image-text traces. For each trace, it separates the textual tokens used to invoke image tools from the final textual reasoning. Stage reliability is the negative average entropy of the stage's top-$k$ highest-entropy tokens, where $k$ is selected to maximize the average reliability increase between mining and reasoning on a calibration set. Entropy is computed from the normalized top-10 token probabilities.

For each question, the method sets mining and reasoning thresholds at percentile $\alpha$ of warm-up trace reliabilities. A trace survives only if both stages meet their respective thresholds. The final answer is chosen by a weighted vote. A trace receives more weight when its combined mining and reasoning reliability is high and when reasoning becomes more reliable after the visual cue is acquired.

In the online version, eight warm-up traces initialize thresholds. Later traces are terminated when a turn falls below the mining-stage threshold, then subjected to full dual-stage filtering if completed. Generation stops when weighted consensus reaches $\beta=0.9$ or the budget of 32 traces is exhausted. The offline version filters and votes over 32 complete traces.

## Experiments

The evaluation uses Qwen3-VL-8B Thinking and Instruct variants on Vstar Bench, HR-Bench at 4K and 8K resolution, TreeBench, MathVision, LogicVista, and VisualProbe; an additional study uses DeepEyes-7B. Metrics include accuracy, token saving ratio (TSR), and TreeBench mean intersection-over-union for retrieved visual cues.

Under the online protocol, RTWI outperforms the reported self-consistency result for every listed Qwen3-VL setting. Examples include 85.2% versus 80.0% on Vstar attribute questions for the Thinking model, with 61.1% TSR; 61.7% versus 46.4% on LogicVista, with 50.5% TSR; and 94.8% versus 92.2% on Vstar attributes for the Instruct model, with 60.4% TSR. On TreeBench, the Thinking model reaches 37.1% reasoning accuracy and 40.8 mIoU versus 30.9% and 37.8 for self-consistency, while saving 59.4% of tokens.

Offline results similarly favor RTWI across the reported benchmark columns. Ablations on Vstar and HR-Bench 4K show that removing either dual-stage filtering or reliable voting reduces accuracy. The full method reports 83.4% and 78.6%, compared with 80.8% and 77.1% without dual-stage filtering and 81.9% and 77.9% without reliable voting. The reported method remains stable for filtering ratios from 0.3 to 0.5; a temperature study reports stability from 0.05 to 0.1.

## Limitations

- Reliability is inferred from textual token entropy, so the method assumes tool-invocation uncertainty is a useful proxy for the relevance and accuracy of continuous visual cues.
- Thresholds and the top-$k$ choice depend on per-question warm-up traces, adding calibration cost before online savings begin.
- Most experiments use Qwen3-VL-8B; the additional DeepEyes-7B results broaden model coverage but do not establish behavior for closed or substantially different multimodal systems.
- The method requires token-probability access and therefore may not be usable with opaque APIs.
- The reported benchmarks emphasize visual search, high-resolution perception, mathematics, and visual logic; broader agent applications are left for future work.
- The source reports token saving ratios rather than end-to-end latency or monetary cost, so wall-clock efficiency is not established.

## Related Concepts

- [[concepts/thinking-with-images|Thinking with Images]]
- [[concepts/adaptive-test-time-reasoning-routing|Adaptive Test-Time Reasoning Routing]]
- [[concepts/adaptive-computation|Adaptive Computation]]

## Related Papers

- Wang et al. (2022), *Self-Consistency Improves Chain of Thought Reasoning in Language Models*, aggregates sampled reasoning paths by majority vote.
- Li et al. (2024), *Escape Sky-High Cost: Early-Stopping Self-Consistency for Multi-Step Reasoning*, stops sampling after answer consensus.
- Fu et al. (2025), *Deep Think with Confidence*, filters or scales reasoning using confidence signals.
- Zheng et al. (2025), *DeepEyes: Incentivizing "Thinking with Images" via Reinforcement Learning*, trains multimodal models to manipulate images during reasoning.
- Yang et al. (2025), *Deep but Reliable: Advancing Multi-Turn Reasoning for Thinking with Images*, improves self-reflection through reinforcement learning rather than inference-time filtering.

Source note: Synthesized from the supplied parsed Markdown for Cognitio job `a74ca0c5-8d18-4c56-b821-37d0b92c67eb`. The source provides the project URL `https://github.com/XLearning-SCU/Reliable_TWI` but does not state a publication year, DOI, arXiv identifier, or venue.

[[index|Library home]]
