---
title: "Making a Difference: The Consequences of Electoral Experiments"
type: paper
authors:
  - Tara Slough
year: 2024
doi: 10.1017/pan.2023.44
tags:
  - experimental-design
  - research-ethics
  - elections
---

## TL;DR

Slough bounds how much an electoral experiment could change district-level voting and compares that bound with a conservative election forecast. The resulting design rule favors sparse interventions in large, predictable electorates, while exposing trade-offs with statistical power and generalizability.

## Research Question

How can researchers design electoral experiments that are unlikely to change who wins office, including when randomization reallocates an intervention a partner would implement anyway?

## Motivation

The ethical concern concerns individual election outcomes and downstream effects on whole communities, not merely average treatment effects among subjects. Among 129 classified preregistered experiments, only two explicitly discussed changing aggregate outcomes in their written ex ante design considerations. District-level exposure and counterfactual allocation therefore need to enter design decisions.

## Contributions

- Formalizes [[concepts/ethical-design-of-electoral-experiments|Ethical Design of Electoral Experiments]] through extreme-value bounds and a forecast-based decision rule.
- Distinguishes researcher-created interventions from randomization of an existing partner intervention.
- Extends impact bounds to within- and between-cluster interference.
- Connects ethical constraints to district size, electoral institutions, treatment saturation, power, and external validity.

## Method

The relevant counterfactual is no intervention for researcher-initiated studies, but the partner's nonexperimental allocation for interventions that would otherwise occur. Experimental saturation counts voters whose assignment changes in either direction relative to that counterfactual, divided by registered voters in the district.

Under no within- or between-cluster interference, binary vote-choice outcomes yield extreme-value bounds on maximum aggregate electoral impact (MAEI). The bound uses the number of voters whose assignments change and their expected untreated support for the marginal winning candidate. Setting untreated support to zero or one yields a conservative bound without estimating average treatment effects; balanced support minimizes the bound. The denominator is registered voters, not votes cast.

A transferred vote can reduce the winning margin by two votes. Thus an outcome cannot change under the maintained assumptions if the margin exceeds twice MAEI. Section 4.3 proposes proceeding only when twice MAEI is below the fifth percentile of the predictive margin distribution. This is a model- and assumption-dependent design criterion, not an empirically guaranteed 5% error rate.

Allowing within-cluster interference expands the potentially affected population to entire clusters with changed assignments. Between-cluster interference additionally includes a specified fraction of voters in otherwise unchanged clusters. If spillovers can reach every voter, no experiment in a contested election passes the rule.

## Experiments

This methodological paper combines formal bounds, retrospective applications, and a design simulation rather than reporting a new randomized intervention.

- A survey of 14 information-and-accountability studies could calculate MAEI for only six. The remaining eight lacked adequate sampling or constituency-size information. Without ex ante forecasts, these retrospective bounds generally cannot establish whether designs would pass the decision rule.
- The Colorado 2018 illustration covers 65 State House and seven U.S. House races, using registration data, precinct mappings, and forecasts. State House predictions use 2012–2016 electoral data; U.S. House predictions come from an existing forecast.
- The 90% predictive intervals include zero for 33 of 65 State House races and two of seven U.S. House races, excluding intervention there under the proposed rule.
- Individually assigned interventions can accommodate more subjects in larger, less competitive districts. Moving from the worst to best untreated-support assumption can double permissible treatment counts. Precinct-level randomization allows relatively few treatable precincts, especially in State House races.

## Limitations

The objective protects the identity of officeholders, not all possible harms from changing vote shares, campaign dynamics, or governance. Conservative bounds depend on credible restrictions on interference, while the decision rule depends on forecast quality. Restricting studies to predictable races and particular electoral systems narrows generalizability; reducing exposure can reduce power. Concurrent elections require attention to smaller electorates exposed to the same intervention. The supplied text references supplementary proofs and detailed applications that are not included in the Markdown.

## Related Concepts

- [[concepts/ethical-design-of-electoral-experiments|Ethical Design of Electoral Experiments]] — links a societal outcome constraint to allocation and exposure decisions.
- [[concepts/network-specific-spillover-effects|Network-Specific Spillover Effects]] — studies attribution of indirect effects to channels; here spillover reach instead determines the population entering a worst-case impact bound.

## Related Papers

- [[papers/sign-congruence-external-validity-and-replication|Sign-Congruence, External Validity, and Replication]] — a complementary account of how design and setting differences constrain generalization; ethical selection of electoral settings makes that distinction relevant.
- Manski (2003), *Partial Identification of Probability Distributions* — the cited foundation for extreme-value bounds.
