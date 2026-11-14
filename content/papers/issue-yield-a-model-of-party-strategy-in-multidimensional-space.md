---
title: "Issue Yield: A Model of Party Strategy in Multidimensional Space"
type: paper
authors:
  - Lorenzo De Sio
  - Till Weber
year: 2014
doi: "10.1017/S0003055414000379"
tags:
  - party-competition
  - issue-emphasis
  - electoral-strategy
---

## TL;DR

Parties can broaden their appeal while protecting their existing electorate by emphasizing policies that combine broad public support with positive partisan association. De Sio and Weber formalize this combination as [[concepts/issue-yield|Issue Yield]] and find that it predicts manifesto emphasis across 150 parties in 27 EU countries.

## Research Question

Which policies should a party emphasize when changing its positions is costly and attracting new voters may alienate its existing supporters?

## Motivation

Multidimensional competition gives parties opportunities to redirect attention toward favorable issues. The paper treats positional and valence issues as ends of a continuum defined by policy support, rather than intrinsically different categories. Widely supported policies can retain a partisan character and connect a party to a larger electorate.

## Contributions

- A support–partisanship framework distinguishes bridge, venture, pamper, and dead-end policies.
- A survey-based index combines opportunities for electoral expansion with protection of existing support.
- Comparative manifesto evidence tests the index against its components and examines how competing parties' ownership of an issue constrains its use.

## Method

Let \(i\) denote the electorate share supporting a policy, \(p\) the share supporting a party, and \(f\) the share supporting both. Differential support is \(d=f-ip\). Bridge policies have positive differential support and policy support greater than party support. Venture policies satisfy only the latter condition; pamper policies only the former; dead-end policies satisfy neither.

The scaled index (Equation 3) is

$$
Y=\frac{f-ip}{p(1-p)}+\frac{i-p}{1-p}.
$$

Its geometric construction projects a policy's support–partisanship vector onto the direction favoring both retention and expansion, with normalization for party size. It describes strategic opportunities, not an estimated number of votes gained.

The analysis combines European Election Study 2009 survey responses with Euromanifestos coding. Emphasis is the percentage of manifesto quasi-sentences devoted to each policy side. Mixed-effects models account for crossed and nested variation across countries, issues, party families, and parties. A further model interacts yield with the effective number of issue competitors, measuring how dispersed policy supporters are among rival parties.

## Experiments

The observational study covers more than 27,000 voters, 12 issues with two policy sides each, and 150 parties across 27 countries, yielding 3,600 party–policy observations.

- Mean manifesto emphasis is 0.96% for bridge policies, 0.54% for venture policies, 0.12% for pamper policies, and 0.08% for dead-end policies.
- In Table 4, Model 2 estimates a yield coefficient of 1.48 (SE 0.40), with reported explained variance rising from 9.5% in the intercept model to 27.9%.
- Adding vector direction and magnitude, or the original support components, leaves yield positive and statistically significant; those additional fixed effects are individually insignificant.
- Comparable OLS models explain 7.68% of variance with yield, 6.66% with direction and magnitude, and 6.61% with the original support components.
- The yield-by-competition interaction is 0.15 (SE 0.07): yield more strongly predicts emphasis when rival support for a policy is dispersed rather than concentrated in one competitor.

## Limitations

The cross-sectional design cannot resolve reverse causation between party strategy and voter preferences. Survey measurements follow manifesto publication. Survey-to-manifesto issue matching is imperfect, and manifesto space captures only one form of campaign emphasis. The ownership measure is indirect; the authors do not claim a conclusive test against ownership theory. Issue salience, preference intensity, and the special context of European Parliament elections leave further scope for testing. The study predicts emphasis, not realized electoral gains.

## Related Concepts

- [[concepts/issue-yield|Issue Yield]]
- [[concepts/party-issue-agendas|Party Issue Agendas]]
- [[concepts/ideological-core-and-policy-periphery|Ideological Core and Policy Periphery]]

## Related Papers

- [[papers/parties-ideological-cores-and-peripheries|Parties' Ideological Cores and Peripheries]] — a complementary distinction between identity-preserving commitments and opportunities for adaptation.
- [[papers/the-partypress-database-a-new-comparative-database-of-parties-press-releases|The PARTYPRESS Database]] — a complementary source for measuring party attention beyond election manifestos.

[[index|Library home]]
