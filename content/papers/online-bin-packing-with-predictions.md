---
title: Online Bin Packing with Predictions
type: paper
authors:
  - Spyros Angelopoulos
  - Shahin Kamali
  - Kimia Shadkami
year: null
tags:
  - online-algorithms
  - bin-packing
  - learning-augmented-algorithms
---

## TL;DR

Frequency predictions can guide online bin packing through a small representative multiset whose packing supplies reusable space reservations. PROFILEPACKING approaches an asymptotic competitive ratio of one with accurate predictions, while HYBRID mixes it with a conventional online algorithm to trade consistency for robustness. The paper proves error-dependent guarantees and a matching-order obstruction to robust near-perfect consistency, then evaluates prefix-based predictions on synthetic and BPPLIB-derived streams.

The supplied Markdown does not establish a publication year or stable identifier; these are left unspecified.

## Research Question

Can learnable predictions of item-size frequencies improve irrevocable online packing decisions while retaining explicit guarantees when predictions are inaccurate?

## Motivation

Error-free advice can encode information about an optimal packing that is difficult to learn. Size frequencies are simpler statistical targets. They provide aggregate information without revealing arrival order, making them useful for resource allocation while still leaving a substantive online decision problem.

## Contributions

- PROFILEPACKING converts frequency estimates into repeated packing templates and achieves near-optimal consistency in a fixed discrete size model.
- HYBRID provides a parameterized combination with a robust online baseline, with an explicit bound depending on prediction error.
- A lower bound shows that sufficiently strong consistency forces robustness to grow with bin capacity in this model.
- Extensions address bounded items per bin, fractional sizes, and sampling; experiments also explore evolving distributions.

## Method

Items have integer sizes in $\{1,\ldots,k\}$ and bins have capacity $k$, held constant as sequence length grows. Predictions $f'_x$ estimate size frequencies $f_x$, with error $\eta=\sum_x|f_x-f'_x|$. Performance is the asymptotic ratio of bins opened to the offline optimum.

**Profile construction.** Build a multiset containing $\lceil mf'_x\rceil$ copies of each size and compute an optimal packing. Its bins define placeholders for future items. Arrivals fill matching placeholders, preferring already occupied bins; exhausted reservations trigger a new virtual profile group. Only bins that receive items incur cost. Sizes absent from the prediction are packed separately by First Fit.

**Guarantees.** For $0<\epsilon\leq 0.5$ and sufficiently large $m\geq3\tau_k k/\epsilon$, where $\tau_k$ counts bin types, Theorem 3 gives

$$
\operatorname{cr}(\mathrm{PROFILEPACKING},\eta)
\leq 1+\epsilon+(2+5\epsilon)\eta k.
$$

Thus perfect predictions yield a ratio at most $1+\epsilon$. Theorem 4 states that, for fixed $0<c<1$ and $\alpha\leq c/k$, any $(1+\alpha)$-consistent algorithm using frequency predictions has robustness at least $(1-c)k/2$.

**Hybrid allocation.** HYBRID($\lambda$) maintains separate bins for PROFILEPACKING and a baseline $A$. It first fills available matching placeholders in occupied profile bins, then uses per-size counters to control how much new work goes to each component. For rational $\lambda\in[0,1]$, Theorem 5 gives

$$
\operatorname{cr}(\mathrm{HYBRID}(\lambda),\eta)
\leq\lambda[1+\epsilon+(2+5\epsilon)\eta k]+(1-\lambda)c_A.
$$

Here $\lambda=1$ selects PROFILEPACKING and $\lambda=0$ selects the baseline. The placeholder-first rule matters because complementary arrivals can complete reservations even after a nominal per-size quota is reached.

**Extensions.** If at most $r$ items fit per bin, the error-dependent factor $k$ can be replaced by $r$ under the extension's assumptions. Fractional items can be handled separately with an additive bound depending on their share of total item volume. Small rounding distance alone is insufficient: the paper establishes a $4/3$ lower bound even with perfect rounded-frequency information. Sampling connects learnability of frequencies to packing guarantees.

## Experiments

The evaluation uses streams of $10^6$ items, capacity $k=100$, Weibull-generated inputs and five BPPLIB benchmark families. Predictions come from input prefixes rather than artificially corrupted perfect information. HYBRID uses First Fit as its baseline, tests $\lambda\in\{0,0.25,0.5,0.75,1\}$, and normally sets $m=5000$. The implementation packs profiles with First Fit Decreasing rather than the exact optimizer assumed in the principal guarantee. Comparators are First Fit, Best Fit, and the L2 lower bound on offline cost.

- In the representative Weibull experiment, the three intermediate hybrid settings outperform First Fit and Best Fit for errors below approximately $0.27$. PROFILEPACKING degrades more rapidly as error increases.
- On the representative GI input, $\lambda=0.25$ and $0.5$ outperform both baselines over practically all tested errors. Aggregation over 20 sequences using rounded error bins yields similar but less pronounced differences.
- Profile-size sweeps on Weibull and GI inputs show relatively stable performance once $m$ is sufficiently large, around $1000$ in these experiments.
- ADAPTIVE periodically updates predictions from recent items. With distributions changing every 50,000 arrivals, useful window ranges depend on the benchmark. It gives no advantage on Wascher, where the baselines are already close to the L2 lower bound.

## Limitations

The strongest guarantees assume fixed integer capacity, sufficiently large profiles, and exact profile packing; constant preprocessing relative to stream length need not be inexpensive in capacity or accuracy. Empirical profiles use a heuristic and do not directly instantiate all theorem conditions. Prefix estimates need not represent arbitrary future distributions, and ADAPTIVE is evaluated as a heuristic rather than supplied with a general drift guarantee. The experiments use generated streams, not an operational VM-placement deployment.

The parsed source contains inconsistent statements about the direction of the Schwerin parameter effect and an arithmetic discrepancy in its fractional-size example. The summary therefore retains the general theorem and avoids those specific interpretations and numerical examples.

## Related Concepts

- [[concepts/learning-augmented-online-algorithms|Learning-Augmented Online Algorithms]]: evaluates prediction-assisted decisions through consistency, robustness, and error-dependent performance.

## Related Papers

- Lykouris and Vassilvitskii (2021), “Competitive caching with machine learned advice”: a foundation for the consistency–robustness framework used here.
- Angelopoulos et al. (2020), “Online computation with untrusted advice”: studies perfect and adversarial advice; this paper additionally models intermediate frequency error and learnability.
- Im et al. (2021), “Online knapsack with frequency predictions”: a related use of aggregate predictions, with a different prediction target and packing objective.
