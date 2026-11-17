---
title: "The Politics of Policy: The Initial Mass Political Effects of Medicaid Expansion in the States"
type: paper
authors:
  - Joshua D. Clinton
  - Michael W. Sances
year: null
doi: 10.1017/S0003055417000430
tags:
  - policy-feedback
  - political-participation
  - causal-inference
---

## TL;DR

Medicaid expansion increased voter registration in counties with many potentially eligible residents, with effects persisting through 2016. Evidence of increased turnout is weaker and confined to 2014; no turnout effect is detectable in 2016. County-level comparisons support a qualified account of [[concepts/policy-feedback|Policy Feedback]], without identifying individual beneficiary behavior or a definitive mechanism.

## Research Question

Can a highly partisan, means-tested social policy increase political participation, and do its effects on registration and voting persist across elections?

## Motivation

Earlier feedback studies often examined policies enacted with bipartisan support and faced selection problems when comparing recipients with nonrecipients. State variation in Medicaid expansion creates an opportunity to study a politically contested program using nearby counties exposed to different policy environments.

## Contributions

- Separates policy uptake, voter registration, and turnout rather than treating participation as a single outcome.
- Combines geographic border comparisons with pre/post changes and heterogeneity in potential eligibility.
- Shows that persistent registration gains need not generate a durable increase in voting, even during an election featuring threats to repeal the program.

## Method

Following the 2012 Supreme Court decision making expansion optional for states, the authors compare counties near borders separating expansion and nonexpansion states. The main window includes county centers within 100 miles of the nearest contrary-status state. Potential eligibility is the 2013 share of adults aged 18–64 with income at or below 138% of the federal poverty level; high eligibility means above the sample median, approximately 22%.

Regressions explain changes in outcomes with expansion status, distance, high eligibility, their interactions, and optional demographic and electoral covariates. The expansion-by-eligibility interaction is a [[concepts/triple-differences|Triple Differences]] contrast across time, state expansion status, and county eligibility concentration. Low-eligibility counties still contain eligible residents: the interaction measures differential effects, not the total effect in high-eligibility counties. The latter combines the expansion main effect and interaction.

Insurance data come from Census SAHIE; election data come from David Leip’s Atlas and population denominators from the census. Registration and turnout are measured relative to voting-age population. Comparisons use 2014 versus 2010 and 2016 versus 2012 to match election types. Confidence intervals use a state-clustered wild bootstrap.

Identification requires credible counterfactual trends, limited spillovers or treatment-induced migration, and no concurrent state changes that differentially confound high- and low-eligibility counties.

## Experiments

This is an observational quasi-experimental study. Insurance models include 1,348 counties in 32 states; election samples vary with data availability. Tables 2–3 report these interaction coefficients in percentage points, with 95% confidence intervals:

| Outcome | Without covariates | With covariates |
| --- | --- | --- |
| Registration, 2014–2010 | 3.60 [−0.17, 7.35] | 2.70 [0.51, 4.90] |
| Registration, 2016–2012 | 4.09 [1.93, 6.35] | 3.93 [1.67, 6.12] |
| Turnout, 2014–2010 | 3.96 [0.32, 8.05] | 2.36 [−0.63, 5.13] |
| Turnout, 2016–2012 | 0.14 [−1.53, 1.63] | −0.17 [−1.30, 1.01] |

In Table 1, covariate-adjusted insurance estimates combine a −4.33-point expansion main effect with a −5.62-point interaction for 2014–2013, and −5.71 with −6.69 for 2015–2013. Coverage gains are therefore larger in high-eligibility counties.

Reported robustness checks include alternative distance windows, border fixed effects, two-dimensional distance, migration and covariate balance checks, pre-expansion participation changes, matched electoral configurations, and within-state analyses. In 1,000 placebo expansion assignments, absolute estimates at least as large as observed occur in 3.2% and 1.4% of registration comparisons, versus 9.5% and 79.6% of turnout comparisons for 2014 and 2016 respectively. These checks support registration findings more strongly than turnout findings.

## Limitations

Aggregate outcomes cannot establish which beneficiaries registered or voted. State adoption was not randomized, and simultaneous policy changes remain a possible threat. The 2014 turnout interaction loses conventional significance with covariates. Persistent registration reflects the earlier surge: the paper reports no additional registration effect for 2016 versus 2014.

Enrollment-linked registration under the National Voter Registration Act is a plausible mechanism, but resource effects, interpretive effects, and mobilization by outside groups are not separately identified. Opponent mobilization cannot be ruled out. The study does not establish partisan vote gains, policy durability, or effects beyond 2016.

The supplied Markdown does not explicitly identify the publication year, so that metadata is left unset. Numerical intervals above follow the tables, which retain negative signs omitted in some surrounding parsed prose.

## Related Concepts

- [[concepts/policy-feedback|Policy Feedback]]: policies can reshape participation through resources, administrative opportunities, and political interpretations.
- [[concepts/triple-differences|Triple Differences]]: the eligibility interaction compares differential changes across expansion status.

## Related Papers

The source contrasts its design with Haselswerdt (2017), “Expanding Medicaid, Expanding the Electorate,” which examines short-term participation in House races, and with Soss (1999), “Lessons of Welfare,” which studies political learning and action under means-tested welfare. These are cited relationships from the supplied paper, not separately reviewed sources.

Replication identifier supplied by the paper: `10.7910/DVN/X0ZPH4`.
