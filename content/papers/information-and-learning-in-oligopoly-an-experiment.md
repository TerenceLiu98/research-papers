---
title: "Information and learning in oligopoly: An experiment"
type: paper
authors:
  - Maria Bigoni
  - Margherita Fort
year: 2013
doi: "10.1016/j.geb.2013.05.006"
journal: "Games and Economic Behavior"
volume: 81
pages: "192-214"
tags:
  - experimental-economics
  - learning-in-games
  - information-acquisition
  - cournot-oligopoly
---

## TL;DR

In a repeated Cournot experiment with 48 participants, information look-ups and output choices jointly support a mixture of adaptive learning, reinforcement, and imitation. A generalized [[concepts/experience-weighted-attraction-learning|Experience-Weighted Attraction Learning]] model assigns the largest payoff weights to calculator-assisted adaptive learning. Output rises above the Cournot benchmark, but neither convergence to the competitive outcome nor a special weight on the best competitor's profits is established.

## Research Question

How do players learn in repeated oligopoly when market information must be actively acquired under time pressure, and how does their information search relate to subsequent choices?

## Motivation

Different learning rules can generate similar actions while requiring different information. Earlier oligopoly experiments varied information supplied across treatments and produced mixed evidence about imitation. Observing [[concepts/information-search-in-game-experiments|Information Search in Game Experiments]] offers an additional way to distinguish learning mechanisms within a common information environment.

## Contributions

- Combines repeated output decisions with records of information access, viewing time, and calculator inputs.
- Classifies participants by information-search patterns and compares their subsequent adjustment toward competing learning-rule predictions.
- Extends EWA to include actually inspected calculator payoffs and competitors' observed action-payoff pairs alongside own realized payoffs.
- Estimates relative learning weights while explicitly recognizing that the attraction scale and structural payoff weights are not separately identified.

## Method

Four symmetric firms choose integer quantities from 0 to 30 simultaneously for 40 periods. The reported market equations are $p=\max(0,81-\sum_i q_i)$, $C_i(q_i)=q_i$, and $\pi_i=pq_i-C_i(q_i)$. Symmetric individual-output benchmarks are 10 for joint profit maximization, 16 for Cournot-Nash, and 20 for the Walrasian outcome. Each round lasts at most 30 seconds; a missed decision defaults to zero output.

Participants know qualitative price and cost relationships but receive neither a complete payoff table nor the demand function. Previous-period individual profits are displayed. A MouseLab-style interface implemented in z-Tree allows deliberate access to one information window at a time: rivals' individual quantities, rivals' aggregate output history, own output and profit history, or a calculator. The calculator returns either the best response to a hypothetical aggregate rival quantity or the profit from a specified own quantity.

The analysis first classifies participants using the learning category accounting for the longest look-up time in each period, followed by pairwise comparisons across periods. Random-effects regressions then relate quantity changes to best-response, imitate-the-best, imitate-the-average, and trial-and-error predictions, with standard errors clustered by market group.

The generalized EWA model updates each strategy's attraction using discounted past attraction and five payoff channels: own realized payoff, best-reply calculator payoff, profit-calculator payoff, observed best-rival payoff, and observed other-rival payoffs. Information-access indicators gate the latter four channels. A surprise index based on aggregate rival output adjusts memory decay, and a logistic response maps attractions into choice probabilities. Conditional-logit estimation identifies products of response sensitivity with payoff weights, $(\lambda\alpha,\lambda\beta,\lambda\gamma,\lambda\epsilon,\lambda\zeta)$. Ratios identify relative weights when $\lambda\ne0$; their levels do not separately identify sensitivity and structural weights (Section 4.4 and Appendix C).

## Experiments

Three identical sessions at the University of Bologna in November 2007 involved 48 undergraduates in 12 fixed four-person markets. Average payment was EUR 13 including a EUR 4 participation fee. This is one experimental information environment, with comparisons across participants and periods.

| Evidence | Reported result | Source |
|---|---|---|
| Individual output | Mean 17.6 overall; 16.7 in periods 1-10 and 18.1 in periods 31-40 | Table 2 |
| Change across halves | Group mean output increases; Wilcoxon signed-rank $p=0.0196$, $N=12$ | Section 4.1 |
| Collusive quantity | Quantity 10 chosen in 5.4% of cases | Section 4.1 |
| Calculator search sequence | 92.70% of calculator-use observations have a preceding look-up sequence consistent with adaptive learning | Table 4 |
| Participant classification | 29 adaptive, 14 imitate-the-average, 2 reinforcement, 3 unclassified; none exclusively imitate-the-best | Section 4.2 |
| Classification and output | Adaptive group mean 16.9 versus 18.7 for imitate-the-average; profit differences are not significant | Table 6 and Section 4.2 |
| Full-sample EWA coefficients | Own payoff 0.009; best-reply calculator 0.017; profit calculator 0.020; best rival 0.006; other rivals 0.007; all significant at 1% | Table 11 |

The EWA table's 58,032 observations are alternative-level rows: $48\times39\times31$, rather than independent participants or decisions. Calculator inputs are largely explained by opponents' output in the preceding two periods, consistent with short-memory adaptive learning. Within-market output dispersion does not decline with experience, limiting claims of convergence.

The best-reply calculator weight is 2.633 times the best-rival weight (95% CI 1.980-3.287). In contrast, the best-rival/other-rival ratio is 0.890 (95% CI 0.582-1.200), providing no evidence of extra weight on the best performer. Reinforcement and imitation coefficients are positive, but their relative weights are generally not significantly different. Differences in relative weights across information-search groups are also mostly insignificant (Table 12).

Trial-and-error adjustment is insignificant over the full sample, although it appears in the first half of play. Imitation becomes relatively more prominent over time, while 69% of participants retain their information-search classification across halves (Section 4.3). Little consultation of own history therefore does not rule out reinforcement: participants may remember their recent outcomes.

## Limitations

Information acquisition is chosen by participants. Its association with actions and the fitted EWA coefficients does not isolate the causal effect of exposing a particular piece of information. Viewing a window also does not establish how its contents were processed, and remembered information can matter without another look-up.

The evidence comes from 48 students, 12 fixed markets, a known 40-period horizon, and a restrictive interface. These features limit generalization to firms and longer learning horizons. The model uses specified initialization, memory decay, and a logistic response; estimates describe behavior conditional on these assumptions. Adaptive learning's larger payoff coefficients are not population shares of mutually exclusive learning types.

The supplied Markdown contains extraction defects: it omits the title and reports a Cournot profit of 512 even though its stated equations at $q_i=16$ imply 256. This page retains the consistent quantity benchmarks and does not use that profit comparison. The title and bibliographic metadata were verified against the [publisher record](https://www.sciencedirect.com/science/article/abs/pii/S0899825613000791); substantive results are drawn from the supplied Markdown.

## Related Concepts

- [[concepts/experience-weighted-attraction-learning|Experience-Weighted Attraction Learning]]
- [[concepts/information-search-in-game-experiments|Information Search in Game Experiments]]
- Cournot competition
- Adaptive learning and fictitious play
- Payoff-based imitation

## Related Papers

- Camerer and Ho (1998, 1999), EWA learning in coordination and normal-form games: foundations of the attraction-based model, as discussed in Section 4.4.
- Ho, Camerer, and Chong (2007), "Self-tuning experience weighted attraction learning in games": source of the surprise-dependent memory mechanism.
- Bigoni (2010), "What do you want to know? Information acquisition and learning in experimental Cournot games": companion experiment with computerized opponents following specified learning rules.
- Huck, Normann, and Oechssler (1999), "Learning in Cournot oligopoly - An experiment": related market design and behavioral adjustment regression.
- Offerman, Potters, and Sonnemans (2002), "Imitation and belief learning in an oligopoly experiment": earlier evidence based on varying information across treatments.

[[index|Library home]]
