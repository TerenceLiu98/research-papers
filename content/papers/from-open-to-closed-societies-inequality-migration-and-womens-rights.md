---
title: "From Open to Closed Societies: Inequality, Migration, and Women's Rights"
type: paper
authors:
  - Marco Casari
  - Maurizio Lisciandra
  - Ali Seyhun Saral
year: null
tags:
  - institutional-change
  - common-property
  - migration
  - gender-inequality
  - polycentric-governance
  - agent-based-modeling
---

## TL;DR

Across six centuries of self-governing communities in Trentino, unequal endowments of communal land made wealthier villages attractive destinations for migration through marriage. The paper argues that some villages protected their commons by replacing egalitarian membership inheritance with patrilineal rules, redirecting migration pressure toward other open villages and producing spatial diffusion and institutional lock-in. An agent-based model and archival analyses align with this mechanism, while the centralized Napoleonic reform of 1807 restored egalitarian membership across communities.

## Research Question

Why did some historically egalitarian communities exclude women from inheriting membership rights to common resources, how did those restrictions spread across a decentralized system, and why did reopening require centralized reform?

## Motivation

Studies of commons governance often treat a community as an isolated decision-making unit. Trentino instead offers a network of more than 300 communities whose residents could marry and relocate across village boundaries while each community independently governed access to forests, meadows, and pastures. This setting makes it possible to study how resource inequality and migration connect local institutional choices through network externalities.

## Contributions

- Reconstructs the transition from egalitarian to patrilineal commons membership between 1200 and 1800 using community charters and related archival records.
- Distinguishes inheritance of community membership from inheritance of private assets: the former became increasingly patrilineal, while private-property inheritance remained broadly egalitarian.
- Develops a strategic account in which marriage migration dilutes per-capita commons benefits in attractive communities, inducing exclusionary membership rules.
- Uses an agent-based marriage and residence model to derive gradual closure, wealth-ranked adoption, domino effects, lock-in, and the limited aggregate role of private-asset inheritance.
- Connects decentralized closure to the rapid reopening imposed by the monocentric Napoleonic reform of 1807.

## Method

### Historical data and identification

The study links community charters and other records of membership rules to geographic units in Trentino. The static analysis uses an instrumental-variable probit model for whether a village had moved to patrilineal membership by 1801. Per-capita commons wealth is instrumented with terrain ruggedness, photosynthesis potential, and, in expanded specifications, their within-community ranges; controls include altitude, walking time to a local center, and district fixed effects.

The dynamic analysis uses a five-year discrete-time probit duration model. Its principal exposure is the cumulative share of prior adopters weighted by historical walking times. Time-varying controls include a tree-ring index, population trends, and indicators for major regional events.

### Computational model

The agent-based model contains seven spatially located communities with equal initial populations and unequal common-resource endowments. Individuals choose partners and residence through Gale-Shapley matching based on partner attractiveness, private assets, destination commons wealth, and relocation costs. After each marriage round, population movements change per-capita commons wealth, which probabilistically changes a community's choice between egalitarian and unilineal membership. Results average 1,000 runs over 150 rounds.

## Experiments

The archival record identifies 97 of 286 documented villages, about 33.9%, with patrilineal membership by 1801; adoption followed an approximately S-shaped trajectory from the first recorded change in 1265 through 1794. The simulation predicts that 32.9% of communities eventually switch. In 1,000 simulations, the richest community adopts unilineal membership 95.0% of the time, compared with 0% for the poorest.

Across static IV specifications, a one-unit increase in per-capita commons value is associated with a 10.4 to 11.9 percentage-point increase in the probability of patrilineal membership. The estimated relationship is stronger at higher altitude, where valuable forests and pastures could offset isolation costs. In the dynamic models, spatial contagion is positive and significant in the baseline and controlled specifications; an interaction model indicates that contagion is concentrated among communities with more valuable commons.

The simulations attribute an 11.9% relative increase in final institutional change to the domino effect. Starting one open community amid closed neighbors raises final unilineal adoption by about 25.7 percentage points relative to the baseline, illustrating lock-in. Simulated private-asset inheritance regimes produce no discernible differences in aggregate population, migration, or institutional transitions.

Small marriage-record samples are directionally consistent with the mechanism. Patrilineal high-altitude communities show an estimated reduction of almost 50 percentage points in marriages between foreign husbands and local wives, but several pooled marriage estimates are statistically imprecise.

## Limitations

The computational model is a mechanism illustration rather than a calibrated reconstruction: regional population is fixed, each couple has exactly two children, community locations and individual traits are stylized, and institutional switching follows a specified probabilistic rule. The paper's exclusion restrictions rely on geography affecting institutional choice through commons wealth after conditioning on isolation and district effects; this cannot be proved definitively. Communities without surviving institutional documentation are treated as non-adopters only in an expanded robustness sample. Marriage-pattern evidence covers just 69 to 83 communities and includes weak or null pooled estimates. The historical evidence supports the proposed mechanism but does not directly observe every marriage decision or fully exclude other locally varying causes of institutional change.

## Related Concepts

- [[concepts/polycentric-governance|Polycentric Governance]]
- [[concepts/common-property-membership|Common-Property Membership]]
- [[concepts/success-driven-migration|Success-Driven Migration]]
- Institutional lock-in
- Spatial contagion
- Patrilineal inheritance

## Related Papers

- Casari and Lisciandra (2016), "Gender Discrimination in Property Rights: Six Centuries of Commons Governance in the Alps."
- Casari (2007), "Emergence of Endogenous Legal Institutions: Property Rights and Community Governance in the Italian Alps."
- Ostrom (2010), "Beyond Markets and States: Polycentric Governance of Complex Economic Systems."
- [[papers/involution-game-with-migration-and-spatial-heterogeneity-of-social-resources|Involution Game with Migration and Spatial Heterogeneity of Social Resources]]

[[index|Library home]]
