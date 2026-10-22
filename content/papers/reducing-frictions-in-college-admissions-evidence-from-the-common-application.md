---
title: "Reducing Frictions in College Admissions: Evidence from the Common Application"
type: paper
authors:
  - Brian Knight
  - Nathan Schiff
year: 2022
doi: "10.1257/pol.20190694"
tags:
  - college-admissions
  - application-frictions
  - common-application
  - network-effects
  - higher-education
---

## TL;DR

Using institution panels from 1990-2016, Knight and Schiff find that colleges receive about 12% more applications and experience about 9% lower yield after joining the Common Application. Adoption is also associated with more out-of-state enrollment, a larger non-White share, and a smaller Pell-recipient share. These patterns are consistent with reduced [[concepts/college-application-frictions|college application frictions]] and greater student choice, but adoption is not random and some findings, especially those for SAT scores and selectivity, depend on the comparison strategy or are imprecise.

## Research Question

Does joining the Common Application reduce the cost of applying to multiple colleges, expand student choice, and geographically integrate the college market? Does it also change institutional selectivity or stratification by test scores, race, and income?

## Motivation

US college admissions are decentralized: students submit separate applications and institutions independently make offers. A shared application can reduce the time cost of adding another college, but the consequences need not be uniformly equalizing. Easier multi-college application may broaden choice and geographic mobility while disproportionately helping institutions and students already positioned to use the platform.

## Contributions

- Connects a simple model of application costs, admissions, and enrollment capacity to institution-level evidence on Common Application adoption.
- Estimates changes in applications, yield, admits, acceptance rates, and student composition with institution and year fixed effects and event studies.
- Addresses differential pre-trends with a restricted comparison group of colleges scheduled to join three to five years later.
- Tests [[concepts/platform-network-effects-in-college-admissions|platform network effects]] through overall membership size and source-state Common Application penetration.
- Separates racial, income, and test-score dimensions of stratification rather than treating diversity as a single outcome.

## Method

### Theoretical Model

Students first choose where to apply, colleges then set admission rates to fill fixed capacity, and admitted students finally choose where to enroll after receiving additional information. Applying to a second college provides option value and insurance against rejection but carries a cost. The Common Application is modeled as lowering that marginal cost. More students consequently apply to both colleges; yield falls because admitted students hold larger choice sets, so colleges issue more offers to fill capacity. Extensions allow heterogeneous students, fee and time costs, more colleges, and geographic interpretation of first- and second-choice institutions.

### Data

The main College Board Annual Survey of Colleges panel covers four-year public and private institutions from 1990 through 2016. It contains applications, admits, freshman enrollment, out-of-state share, SAT percentiles, and racial composition. The unbalanced panel has median coverage of 24 of 27 surveys. Pell Grant and IPEDS data measure income composition and interstate student migration.

### Identification

Baseline regressions compare outcomes within institutions before and after joining, with institution and year fixed effects and institution-clustered standard errors. Event studies assess timing and pre-trends. Because joining may reflect changing institutional strategy, the alternative design retains eventual adopters and compares each joining college with colleges that will join three to five years later, using an eight-year window from five years before adoption through two years after.

This future-joiner design improves comparability and shows flatter pre-trends, but it has fewer institutions and cannot estimate long-run effects. Neither design randomizes platform entry.

## Experiments

This is an observational panel study, not a randomized experiment.

### Admissions Outcomes

In the full-sample fixed-effects estimates, adoption is associated with 12.0% more applications, 8.7% lower yield, and 11.4% more admits. The future-joiner estimates are similar at 11.0%, 7.4%, and 8.2%, respectively. Applications jump by about 10% in the join year in both event-study designs. Acceptance-rate evidence is mixed: the full-sample coefficient is near zero, whereas the future-joiner estimate indicates a 2.8% reduction.

### Geographic Integration and Network Effects

The out-of-state share rises by 1.36 percentage points in the full sample and 0.64 points with future joiners. In source-state migration models, colleges joining the platform enroll about 3% more students from states with no Common Application penetration but over 20% more from states with complete penetration.

Platform size moderates several estimates. Each additional 100 member colleges raises the application effect by about 1.3%. The implied application increase grows from 8.5% with roughly 100 members to more than 16% with 700. The corresponding out-of-state enrollment effect grows from about 0.5 to 2.5 percentage points. The paper finds no comparable network effect for yield and some reverse moderation for admits.

### Student Composition

The full-sample estimates show a 0.82-point increase in the non-White freshman share and a 2.42-point decline in the undergraduate Pell-recipient share. The future-joiner estimates are a 1.93-point increase and a 1.04-point decline. Because joining institutions initially had fewer non-White and fewer Pell-recipient students than never-joiners, the authors interpret these patterns as reduced racial stratification but increased income stratification.

SAT results are weaker. The full sample shows increases of 4.4 points at the 25th percentile and 9.8 points at the 75th percentile, with only the latter statistically significant. Both future-joiner estimates are smaller and statistically insignificant, and the full-sample event study for the 75th percentile shows pre-trends.

## Limitations

- **Non-random adoption:** Colleges may join while changing recruiting, expansion, or other admissions strategies. The authors find little supporting evidence in enrollment, PhD-faculty counts, or application fees, but lack direct recruiting and outreach measures.
- **Comparison trade-off:** The full sample supports long-run analysis but has less comparable controls and some pre-trends. Future joiners improve comparability but sharply reduce sample size and observe only two post-entry years.
- **Interpretation:** More applications and lower yield are consistent with lower application costs and expanded choice, but the institution-level data do not directly observe individual application sets or their costs.
- **Outcome measurement:** Pell shares cover all undergraduates rather than entering freshmen, so income effects should emerge gradually. Race is recorded in broad non-White shares, and applicant-pool composition is unavailable.
- **Uneven findings:** Selectivity changes with the comparison group; SAT estimates are imprecise; some network interactions are absent or reverse signed. These results should not be generalized as a uniform platform effect.
- **Welfare:** The theoretical welfare effect is ambiguous. Lower time costs can benefit students, while application fees, congestion, sorting, and distributional changes can offset those gains.

## Related Concepts

- [[concepts/college-application-frictions|College Application Frictions]]
- [[concepts/platform-network-effects-in-college-admissions|Platform Network Effects in College Admissions]]

## Related Papers

- Liu, Ehrenberg, and Mrdjenovic (2007), "Diffusion of Common Application Membership and Admissions Outcomes at American Colleges and Universities": earlier panel evidence focused on public institutions over 1975-2005.
- Smith (2013), "The Effect of College Applications on Enrollment": uses nearby Common Application adoption to study how application volume changes enrollment probability.
- Smith, Hurwitz, and Howell (2015), "Screening Mechanisms and Student Responses in the College Market": examines how fees, essays, and the Common Application shape applications.
- Hoxby (2000), "The Effects of Geographic Integration and Increasing Competition in the Market for College Education": provides the longer-run geographic-integration context.

[[index|Library home]]
