---
title: "Return to the Scene of the Crime: Revisiting Process Tracing, Bayesianism, and Murder"
type: paper
authors:
  - Sherry Zaks
year: 2022
doi: "10.1017/pan.2021.24"
journal: Political Analysis
volume: 30
pages: "306–310"
tags:
  - process-tracing
  - bayesian-inference
  - qualitative-methods
---

## TL;DR

Zaks walks through a hypothetical murder investigation to argue that Bayesian process tracing still lacks adequate implementation guidance. Equal priors and nine illustrative likelihoods yield a reported 92.2% posterior for a specific collusion hypothesis, despite thin circumstantial evidence. The example motivates clearer guidance on hypothesis construction, likelihood assignment, sensitivity analysis, and narrative updating; it is a methodological critique, not an empirical test of Bayesian accuracy.

## Research Question

Does the Bayesian process-tracing literature equip a reasonable researcher to conduct a rigorous analysis even in a simple case?

## Motivation

Formal Bayesian principles leave practical decisions about candidate explanations and evidence probabilities to researchers. Zaks asks whether existing guidance sufficiently constrains those decisions and makes their inferential consequences visible.

## Contributions

- Distinguishes causal factors from mutually exclusive descriptions of how those factors combine, while identifying unresolved questions about exhaustive hypothesis construction.
- Catalogues difficulties assigning likelihoods to apparently unrelated evidence and to evidence whose probability depends on unmodeled contingencies.
- Uses one worked example to connect implementation choices to numerical confidence and to questions about tracking belief changes in narrative analysis.

## Method

The hypothetical evidence consists of an eyewitness sighting of Adam's car near the murder scene, restaurant credit-card receipts offered as Bertrand's alibi, and Bertrand's voicemail directing the victim to an office near the scene. The analysis considers three hypotheses: Adam acted alone, Bertrand acted alone, or Bertrand lured the victim to the scene where Adam killed them. Each receives prior probability one third.

Section 3 examines hypothesis generation, assignment of priors and likelihoods, and updating. Compound hypotheses raise questions about how specifically to describe cooperation and how to assess exhaustiveness. Restaurant receipts illustrate how a likelihood can depend on whether a suspect arranged a false alibi. Narrative updating additionally requires some way to retain the weight of earlier evidence across multiple comparisons.

## Experiments

There are no empirical experiments. The worked example uses the following assigned likelihoods, not estimated frequencies:

| Evidence | Adam alone | Bertrand alone | Specified collusion |
| --- | ---: | ---: | ---: |
| Car sighting | 0.65 | 0.1 | 0.65 |
| Restaurant receipts | 0.14 | 0.005 | 0.14 |
| Voicemail | 0.05 | 0.1 | 0.6 |

The paper reports posteriors of 0.077, 0.0008, and 0.922, respectively. These are rounded reported values. Zaks interprets the concentration on collusion as concerning because no evidence directly connects the suspects to each other or to the crime. She asks how sensitivity to chosen probabilities should be assessed, without presenting a systematic sensitivity study in the supplied text.

## Limitations

- A single constructed example diagnoses implementation concerns; it does not establish how frequently applied analyses fail or prove Bayesian inference invalid.
- The posterior is conditional on the specified hypotheses and assigned probabilities. The example does not validate those inputs or demonstrate exhaustive coverage of possible explanations.
- Multiplying separate evidence likelihoods requires conditional independence given each hypothesis; otherwise sequential likelihoods must condition on preceding evidence. The supplied example does not establish this assumption.
- Footnote markers appear without their corresponding notes, and the referenced supplementary material is absent from the supplied Markdown. Details deferred there cannot be assessed here.
- The publication year follows the 2022 journal volume; the source gives an online publication date of 23 July 2021.

## Related Concepts

- [[concepts/bayesian-process-tracing|Bayesian Process Tracing]]: the paper examines the practical transition from Bayesian principles to numerical and narrative analysis.

## Related Papers

- Zaks (2021), “Updating Bayesian(s): A Critical Analysis of Bayesian Process Tracing”: preceding critique that initiated this exchange.
- Bennett, Charman, and Fairfield (2021), “Understanding Bayesianism: Fundamentals for Process Tracers”: response whose murder example and methodological clarifications motivate this letter; DOI 10.1017/pan.2021.23.
- Fairfield and Charman (2017), “Explicit Bayesian Analysis for Process Tracing: Guidelines, Opportunities, and Caveats”: source of the updating framework discussed here.
- Fairfield and Charman (2019), “A Dialogue with the Data: The Bayesian Foundations of Iterative Research in Qualitative Social Science”: source of guidance on eliciting priors and likelihoods.

Source: [Publisher DOI](https://doi.org/10.1017/pan.2021.24). Summary based on the supplied parsed Markdown.
