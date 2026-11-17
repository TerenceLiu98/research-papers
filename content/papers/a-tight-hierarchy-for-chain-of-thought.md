---
title: A Tight Hierarchy for Chain of Thought
type: paper
authors:
  - Thanh Le
  - A. Pavan
  - N. V. Vinodchandran
year: null
tags:
  - computational-complexity
  - chain-of-thought
  - transformers
---

## TL;DR

The paper proves a strict hierarchy for transformer decoding budgets: under its model and regularity assumptions, $\operatorname{CoT}(r(n))\subsetneq\operatorname{CoT}(r(n)^{1+\varepsilon})$ for every $\varepsilon>0$. Transformer-compatible padding turns coarse simulations by Turing machines into arbitrarily small constant-exponent separations.

## Research Question

Does increasing the asymptotic number of intermediate decoding steps strictly enlarge the class of decision problems a transformer can solve?

## Motivation

Turing completeness with unlimited decoding does not explain how expressivity varies with a bounded budget. Existing simulations incur roughly quadratic overhead in the transformer-to-Turing-machine direction, so directly combining them with classical time hierarchies gives only coarse separations.

## Contributions

- Theorem 3.4 establishes the strict hierarchy for time-constructible, nondecreasing, unbounded $r(n)\geq n$ satisfying $\log r(n+1)=(1+o(1))\log r(n)$.
- Lemma 3.1 shows that equality between budgets $r$ and $r^{1+\varepsilon}$ would propagate to equality between $r^{1+\varepsilon}$ and $r^{1+2\varepsilon}$.
- Explicit transformer constructions preserve computation across supplied padding and generate padding during decoding, enabling the collapse-propagation argument.

## Method

The formal class counts autoregressively generated tokens before a final acceptance token. The model uses saturated (average-hard) attention, multi-layer normalization, and $O(\log(n+r(n)))$ precision. Positional encodings may include input-length-dependent constants; generated positions also receive positional encodings (Appendix A).

The proof starts from the previously established containments

$$
\operatorname{TIME}(r(n))\subseteq\operatorname{CoT}(r(n))
\subseteq\widetilde{\operatorname{TIME}}(r(n)^2+n^2).
$$

For polynomial-order bounds, pad a length-$m$ input with $\lfloor m^c\rfloor$ copies of a fresh symbol, where $c=(1+2\varepsilon)/(1+\varepsilon)$. A transformer checks the padding, copies the original final-position state to the padded boundary, and excludes padding from subsequent simulated attention. This preserves the original absolute decoding budget while changing its expression as a function of input length. Remark 3.2 explains how extra layers reproduce the tailored mask using causal attention.

Assuming equality of the two initial CoT classes, the padded language has a cheaper recognizer. A second transformer generates the padding as intermediate tokens and then runs that recognizer. The resulting budget establishes the collapse-propagation lemma. Iterating it contradicts the coarse strict separation between $\operatorname{CoT}(r)$ and $\operatorname{CoT}(r^9)$ obtained from the classical time hierarchy. Remark 3.3 extends the padding-length choice beyond polynomial bounds using the stated growth regularity.

## Experiments

This is a theoretical paper. Its evidence consists of constructions and proofs; it reports no training experiments, datasets, benchmark accuracies, or measured inference speedups.

## Limitations

- The result concerns asymptotic language classes in the specified formal model, not accuracy improvements for a fixed trained language model.
- The padding argument requires $r(n)\geq n$; the sublinear regime remains open for saturated-attention transformers.
- A separation between $r(n)$ and $r(n)\operatorname{polylog}(r(n))$ remains open. “Tight” here does not establish a classical polylogarithmic-gap hierarchy.
- Near-linear Turing-machine simulation is also an open question. Saturated attention and the permitted positional encodings are substantive model assumptions.
- The supplied Markdown does not establish a publication year or stable identifier; the year is left unspecified. Some extracted formulas are malformed, so this summary relies on the consistent theorem statements and surrounding proof explanations.

## Related Concepts

- [[concepts/chain-of-thought-computational-complexity|Chain-of-Thought Computational Complexity]]: treats generated steps as a resource bounding decidable languages.

## Related Papers

- Merrill and Sabharwal, *The expressive power of transformers with chain of thought* (2023), cited as [MS23a]: supplies the simulation containments used in the proof.
- Hartmanis and Stearns, *On the Computational Complexity of Algorithms* (1965), cited as [HS65]: supplies the classical time hierarchy underlying the contradiction.
- Pérez, Barceló, and Marinkovic, *Attention is Turing-Complete* (2021), cited as [PBM21]: establishes the broader computability connection, without the fine resource hierarchy proved here.
