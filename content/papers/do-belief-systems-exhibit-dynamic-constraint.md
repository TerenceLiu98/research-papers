---
title: "Do Belief Systems Exhibit Dynamic Constraint?"
type: paper
authors:
  - Alexander Coppock
  - Donald P. Green
year: null
source_job_id: c029d3fb-4b93-48bf-b2dc-b4ef4d86507e
tags:
  - public-opinion
  - political-ideology
  - survey-experiments
---

## TL;DR

Randomized interventions change targeted political attitudes but produce little corresponding change in other attitudes, even among elites with relatively coherent political views. Static ideological consistency therefore need not imply spontaneous dynamic adjustment. A separate experiment suggests that explicitly drawing attention to inconsistency can encourage more consistent responses.

## Research Question

Does an exogenous change in one political attitude propagate to related attitudes, and does this process differ between mass and elite respondents?

## Motivation

Research on [[concepts/ideological-constraint|Ideological Constraint]] mainly measures correlations among attitudes. These correlations do not establish that a change in one opinion causes adjustment elsewhere. Experiments can isolate domain-specific shocks more effectively than major political events that directly affect multiple issues.

## Contributions

- Distinguishes static predictability from dynamic functional interdependence.
- Enumerates 32 causal graphs under explicit assumptions to connect unobserved belief systems with observable treatment-effect patterns.
- Tests target and nontarget effects across mass and elite convenience samples, with replications.
- Demonstrates that prompting consistency can change subsequent spending preferences, motivating a social-enforcement explanation of elite coherence.

## Method

The framework includes an exogenous intervention, a target attitude, a nontarget attitude, and an unobserved belief system. Assumptions impose exogeneity, acyclic causal ordering, and a requirement that a belief system influencing either attitude influences both. Dynamic constraint is operationalized through mediation by that shared belief system.

Rather than estimate mediation through an unmeasured variable, the authors compare observed effect patterns with admissible graphs. Under their model, target-only effects are compatible with three graphs that exclude belief-system mediation. Effects on both attitudes would not uniquely identify dynamic constraint because other pathways could generate them. This is an assumption-dependent inference about mechanisms, not a direct measurement of ideology.

## Experiments

| Study | Design | Main reported findings |
| --- | --- | --- |
| Op-eds | Random assignment to four libertarian op-eds or control; MTurk N=3,001, elite N=2,181, Lucid N=2,524; 16 attitude outcomes | 39/48 target effects significant, versus 9/144 nontarget effects; after Benjamini–Hochberg correction, 35 target and no nontarget effects remain significant. Pooled average spillover is reported as 1.4% of the direct effect. |
| Religious exemptions | Wording experiment about employment discrimination; original Lucid N=1,087 and replication target-outcome N=2,954 | Target agreement increases by 0.444 (SE 0.133) and 0.410 (SE 0.080) on a seven-point scale. Related marriage and prayer outcomes do not show consistent positive propagation. |
| Inequality | Reanalysis and replication of Trump and White (2018), manipulating graph scaling | Belief that inequality increased rises by 26.1 and 22.9 percentage points. Economic system justification effects are −0.181 (SE 0.103) and −0.071 (SE 0.066) standard units. |
| Consistency correction | Random prompt among respondents whose general government-size and education-spending preferences conflict | Among small-government respondents, subsequent average spending preferences decrease by 0.172 (SE 0.047; N=299) on MTurk and 0.153 (SE 0.030; N=609) on Lucid. Large-government subgroup estimates are less precise. |

Elite cross-domain attitude correlations average 0.22, compared with 0.06 on MTurk and 0.00 on Lucid, yet all three groups show little cross-domain propagation. Follow-ups at ten days and one month find no evidence of delayed dynamic adjustment in study 1.

Table 2 reports a small significant negative replication effect for the local-officials outcome (−0.038, SE 0.018), despite the prose describing all nontarget effects as insignificant. This exception does not indicate the predicted positive propagation.

## Limitations

Convenience samples, selected domains, and particular interventions limit generalization. People whose target attitudes respond may differ in dynamic constraint from those who resist persuasion; large first stages only partly address this selection issue. Belief-system mediation remains unobserved and conclusions depend on the causal assumptions. The consistency experiment supports responsiveness to correction, but does not establish that everyday sanctions explain elite–mass differences. Dynamic constraint in other settings is not ruled out.

The supplied Markdown does not establish the publication year or a stable identifier; year is left unspecified. It also contains damaged numeric typography, so tabulated values are preferred where available.

## Related Concepts

- [[concepts/ideological-constraint|Ideological Constraint]]: static cross-attitude predictability and dynamic adjustment are empirically distinct.

## Related Papers

- [[papers/the-nature-of-belief-systems-in-mass-publics|The Nature of Belief Systems in Mass Publics (1964)]]: supplies the static–dynamic distinction and elite–mass comparison that this paper tests experimentally.
- Trump and White (2018), “Does Inequality Beget Inequality?”: provides the inequality experiment reanalyzed and replicated in study 3.
