---
title: "Solving Repeated Games with Large Language Model"
type: paper
authors:
  - Naming Liu
  - Youzhi Zhang
  - Ying Wen
year: 2026
doi: "10.65109/IRTM9736"
venue: "AAMAS 2026"
tags:
  - llm-agents
  - repeated-games
  - opponent-modeling
  - policy-adaptation
---

## TL;DR

Reflective Hypothetical Mind (RHM) combines [[Hypothesis-Based Opponent Modeling]], regret-based self-reflection, and explicit policy adaptation for LLM agents in repeated games. Experiments with GPT-4o report benefits in coordination, cyclic play, and resource allocation, but plain GPT-4o remains best against several Prisoner's Dilemma opponents. The evidence comes from five runs per setting over 10-30 rounds; it does not establish general equilibrium convergence or robustness to arbitrary adaptive opponents.

## Research Question

Does coupling opponent predictions with reflection and explicit strategy updates improve LLM agents' repeated-game decisions beyond opponent modeling, reflection, or direct prompting alone?

## Motivation

Predicting an opponent's next action need not produce an effective response. The motivating example is mutual defection against Tit-for-Tat: an agent can pursue immediate rewards while failing to restore more profitable cooperation. RHM aims to connect beliefs about opponents to changes in the agent's own decision rules.

## Contributions

- Combines a persistent set of opponent hypotheses, retrospective payoff comparisons, and a candidate-policy update mechanism.
- Evaluates this combination across four game families with deterministic, reactive, and LLM-based opponents.
- Reports where added structure helps and where a direct LLM policy remains competitive.
- States a conditional convergence theorem, whose scope and proof require caution as discussed below.

## Method

Agents observe previous joint actions and choose their next actions from the stage game's action space. RHM has three components (Section 3.2):

1. **Opponent hypotheses.** The LLM generates candidate behavioral rules from interaction history and predicts the next opponent action under the top hypotheses, with default $k=3$. Correct predictions receive $r_h=1$ and incorrect predictions receive $r_h=-1$. Scores follow

   $$V_h \leftarrow V_h + 0.3(r_h-V_h).$$

   A score of at least $0.7$ validates a hypothesis. The procedure uses voting over predicted actions when multiple hypotheses qualify and falls back to the most recent candidate when none qualifies.
2. **Self-reflection.** After observing the opponent's action, the agent compares its realized payoff with the best alternative against that same action:

   $$\operatorname{Regret}_i(a_i,a_{-i})=\max_{a'_i}u_i(a'_i,a_{-i})-u_i(a_i,a_{-i}).$$

   These comparisons inform revisions to decision rules. This is a one-round counterfactual holding the opponent's action fixed, not a measure of the future consequences of changing one's strategy.
3. **Policy adaptation.** Candidate strategies are evaluated using predicted utility and reflection-derived regret corrections, balanced by a weight $\lambda$. Policies with stable gains are retained; otherwise the agent switches candidates or generates new strategies. The supplied text does not specify the experimental value of $\lambda$ or fully operationalize the candidate-generation and switching rules.

## Experiments

All experiments use GPT-4o and undiscounted finite-horizon rewards ($\delta=1$), averaging five simulations per setting. Baselines are direct LLM prompting, Reflexion, and Hypothetical Mind (HM) with $k=1$ and $k=3$. Performance is reported as average accumulated reward (Section 4).

| Game | Rounds and opponents | Reported comparison |
| --- | --- | --- |
| Prisoner's Dilemma | 10 rounds; Grim Trigger, modified Tit-for-Tat, Always Defect, Surrender, cooperative LLM, human-like LLM | RHM leads against Surrender, Always Defect, and Tit-for-Tat. Direct LLM prompting leads against the other three. |
| Battle of Sexes | 10 rounds; Alternation, Always B, cooperative LLM, human-like LLM | Opponent modeling improves coordination; RHM is reported strongest overall, especially against Alternation. |
| Rock-Paper-Scissors | 20 rounds; Tit-for-Tat, Alternation, Always Rock/Paper/Scissors | RHM is reported highest across opponents, although Figure 7's caption describes HM and RHM as comparable against static opponents. |
| Colonel Blotto | 30 rounds; three battlefields, budgets 3-6, alternating opponent allocations | RHM is reported highest at each budget, while Reflexion and direct prompting degrade as budgets grow. |

The Prisoner's Dilemma rewards are 6 for mutual cooperation, 2 for mutual defection, and 10/0 for unilateral defection/cooperation. The modified Tit-for-Tat opponent defects in round 10 regardless of history. Battle of Sexes rewards coordinated choices by 10/7 or 7/10 and mismatches by zero. Rock-Paper-Scissors uses win/tie/loss rewards of 1/0/-1.

Figures 4 and 6 illustrate recovery from mutual defection and adaptation to alternating coordination choices. These are illustrative trajectories rather than independent evidence of general convergence. Exact reward values are not available as numeric tables in the supplied Markdown, so no plot values are reconstructed here.

## Limitations

**Evaluation scope.** One backbone, five repetitions, short horizons, and a restricted opponent set limit generalization. An LLM prompted to behave like a human is not a human participant. The text does not provide full prompts, decoding settings, an exact model snapshot, compute costs, or comprehensive component ablations and parameter sensitivity tests.

**Theoretical scope.** Theorem 1 assumes a stationary opponent, inclusion of the true opponent model, and bounded unbiased reflection updates. It claims almost-sure Nash convergence. As an analytical caveat, the proof does not establish why the fixed learning rate $0.3$ eliminates persistent prediction noise or why a best response to a fixed opponent constitutes a mutually optimal Nash profile. These gaps prevent treating the stated theorem as an established guarantee for the nonstationary settings motivating the paper.

**Specification ambiguities.** The Blotto prose defines payoff as the number of battlefields won, whereas its equation uses overall win/tie/loss rewards. Section 4.6 labels 100, 225, 441, and 784 as allocation counts for budgets 3-6. Under nonnegative integer allocations across three fields, these are the squares of the single-player counts 10, 15, 21, and 28, suggesting joint-action counts. The summary therefore does not adopt these numbers as per-player action-space sizes. The adaptation formula also differs from its accompanying description in how regret depends on reflection signals.

## Related Concepts

- [[Hypothesis-Based Opponent Modeling]]
- [[LLM-Based Strategic Experimentation]]

## Related Papers

- [[Multi-Agent Strategic Games with LLMs]] studies how game conditions affect LLM behavior in a repeated security dilemma; it provides a complementary experimental-design perspective rather than an RHM baseline.
- Cross et al. (2025), "Hypothetical Minds: Scaffolding Theory of Mind for Multi-Agent Tasks with Large Language Models," ICLR. The cited foundation for RHM's opponent-hypothesis module.
- Shinn et al. (2023), "Reflexion: Language Agents with Verbal Reinforcement Learning," NeurIPS. The self-reflective baseline.
- Akata et al. (2025), "Playing Repeated Games with Large Language Models," Nature Human Behaviour. Cited context for direct LLM policies in repeated games.

[[index|Library home]]
