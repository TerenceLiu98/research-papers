---
title: A Model of Long-Term Conflict Resolution and Cooperation
type: paper
authors:
  - David A. Peterson
  - Mirta Galesic
  - Ross A. Hammond
year: 2026
doi: "10.1177/00220027251338841"
journal: Journal of Conflict Resolution
volume: 70
issue: 1
pages: "31-58"
tags:
  - conflict-resolution
  - agent-based-modeling
  - cooperation
  - social-capital
  - social-learning
---

## TL;DR

A conceptual agent-based model examines how small peacebuilding interventions can produce lasting intergroup cooperation through reciprocity and imitation. Across a reported 1,536,000 simulations, direct behavioral interventions work better when combined with opportunities for intergroup contact, visible cooperation rewards, and strong within-group social learning. Gains are generally modest and partly decay after intervention. These are model-generated hypotheses, not empirically validated intervention effects.

## Research Question

When can interventions affecting a small share of a divided society change cooperation throughout the population, and which combinations of program design and social context preserve initial gains?

## Motivation

Interpersonal conflict can persist after formal hostilities end. Research on peace workshops and contact often examines individual participants, leaving uncertain how effects spread to untreated people or survive pressure from an uncooperative social environment. The paper connects this aggregation problem to [[concepts/bridging-social-capital|Bridging Social Capital]] and network-mediated behavioral diffusion.

## Contributions

- Formalizes competing processes of cooperative behavior spreading from participants and participants reverting under influence from their wider society.
- Separates five contextual parameters from six intervention parameters to examine conditional effects of program combinations.
- Identifies complementarity between direct behavioral change, targeted intergroup contact, and visible rewards, especially where within-group imitation is strong.
- Derives hypotheses about program layering while documenting small effects and potentially counterproductive punishment.

## Method

Agents belong to two identifiable groups. Within-group cooperation is assumed; between-group encounters use stochastic play in an iterated prisoner's dilemma. Through [[concepts/diffuse-reciprocity|Diffuse Reciprocity]], experiencing cooperation from an out-group member increases an agent's propensity to cooperate in future out-group encounters, while defection has the opposite effect. Agents also imitate influential in-group members, with influence related to accumulated utility.

Each simulation runs for 30 rounds, with an intervention after round 15. It can directly increase participants' cooperation probability, increase their probability of out-group interaction, reward cooperation, or punish defection. Programs reach 5-20% of the population and select participants randomly or target influential individuals. Payoff interventions apply to participants, and affect behavior through imitation rather than rational utility maximization.

Context varies by group-size ratio, initial intergroup connectivity, initial cooperation, social learning, and hierarchical versus flat social organization. Initial cooperation ranges from 0.1 to 0.4; group-size ratios range from 0.5 to 0.9. The principal outcome is final-round cooperation, treated as a post-intervention equilibrium proxy. It is distinct from the immediate peak, which largely reflects assumed treatment strength and coverage.

The paper's illustrative application compares a community restaurant, intergroup soccer matches, joint reconstruction, and a primary-school peace curriculum in a hypothetical post-civil-war locality. Practitioners assign common contextual parameters and separate intervention parameters using local information and expert judgment, then vary assumptions to explore combinations and contextual sensitivity. This is a scenario-planning procedure, not an evaluated case study or an empirical ranking of those programs ("Illustrative Example").

## Experiments

The authors report 1,536,000 simulations with ten stochastic replications per unique parameter configuration. They analyze outputs with a 500-tree random forest using a bias-correcting splitting method, then OLS regressions with selected interaction terms (Table 2). Regression outcomes are multiplied by 100, so coefficients describe changes on a percentage-point scale, not proportional percentage changes. Appendix analyses of peak cooperation and a 100-tree forest are mentioned but absent from the supplied Markdown.

The main findings are:

- **Partial persistence:** illustrative runs show an immediate cooperation peak followed by decay to a modestly improved final state.
- **Social learning:** within-group learning strongly conditions whether direct treatment spreads. The direct-treatment-by-learning coefficient is 9.53 in Table 2, Model 4; the direct-treatment coefficient at zero values of the interacting parameters is -0.56. These conditional coefficients should not be read as unconditional policy effects.
- **Contact complementarity:** in the authors' comparison with a direct cooperation increase of 0.8, adding a 0.6 increase in intergroup interaction moves final cooperation from just over 29% to just under 30%. Their approximately 20% improvement refers to intervention effectiveness relative to a roughly 25% baseline, not a 20-percentage-point population gain. Without direct behavioral change, additional contact contributes little in this comparison.
- **Visible rewards:** at the same strong direct-treatment setting, a one-unit reward adds roughly half a percentage point to final cooperation. Rewards spread behavior by making participants attractive models for imitation; their effect depends on social learning.
- **Punishment and targeting:** punishment has a small negative coefficient (-0.02 in Model 3), because lowering participants' utility can reduce their influence. Targeting influential individuals in hierarchical networks has a positive but substantively small interaction (0.46 in Model 4).

Higher initial intergroup connectivity has a negative coefficient in the regressions, whereas increasing contact among intervention participants complements behavioral change. The distinction is between more contact in an initially conflictual environment and contact involving people made more cooperative.

## Limitations

There is no validation against real-world intervention outcomes. Individual treatment effects are inputs, and the stochastic choice rule makes rewards operate through imitation by construction. The model assumes two groups and no within-group conflict, and targets peer-to-peer interactions rather than direct institutional reform. A prisoner's dilemma applies only to some conflict situations; the authors explicitly exclude treating it as a universal account of violence. Thirty-round outcomes do not establish persistence over real calendar years or an infinite-horizon equilibrium.

The supplied text lacks the technical appendix, code, and detailed update rules. Its payoff description labels cooperation against defection as a worst outcome valued at positive 1, which conflicts with the stated prisoner's-dilemma ordering; an exact payoff matrix cannot be recovered confidently from this text. Table 1's displayed parameter grid also does not transparently reconcile with the reported run count. These source ambiguities limit reproduction and are not resolved here. The issue year is 2026, while the article copyright is 2025.

The data-availability statement says that no datasets were generated or analyzed, despite the main text describing a large simulated dataset and its analysis. It therefore does not establish access to the simulation outputs. Supplemental material and an interactive scenario tool are mentioned, but their contents are not included in the supplied Markdown.

## Related Concepts

- [[concepts/bridging-social-capital|Bridging Social Capital]]
- [[concepts/diffuse-reciprocity|Diffuse Reciprocity]]
- [[concepts/network-games|Network Games]]: interaction structure conditions the consequences of incentives and behavior.
- [[concepts/social-trust-networks|Social Trust Networks]]: a related framework for social influence, though this paper does not specify a signed trust-network model.

## Related Papers

- [[papers/network-game-in-group-decision-making-managing-consensus-with-incentive-and-interaction-interventions|Network Game in Group Decision Making: Managing Consensus with Incentive and Interaction Interventions]]: a library comparison on joint incentive and interaction interventions; it uses utility-maximizing consensus decisions rather than stochastic intergroup cooperation and is not cited in this paper.
- Axelrod (1984), *The Evolution of Cooperation*: cited foundation for repeated-game cooperation.
- Hammond and Axelrod (2006), "The Evolution of Ethnocentrism": cited agent-based work on group-related behavior.
- Malhotra and Liyanage (2005), "Long-Term Effects of Peace Workshops in Protracted Conflicts": cited empirical motivation for participant-level interventions.

[[index|Library home]]
