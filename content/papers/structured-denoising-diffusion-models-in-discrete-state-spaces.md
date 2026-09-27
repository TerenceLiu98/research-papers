---
title: Structured Denoising Diffusion Models in Discrete State-Spaces
type: paper
authors:
  - Jacob Austin
  - Daniel D. Johnson
  - Jonathan Ho
  - Daniel Tarlow
  - Rianne van den Berg
year: 2021
venue: NeurIPS
tags:
  - diffusion-models
  - discrete-generative-models
  - language-modeling
  - image-generation
---

## TL;DR

D3PMs extend [[concepts/discrete-diffusion-models|Discrete Diffusion Models]] beyond uniform categorical corruption with absorbing states, discretized Gaussian transitions, and token-embedding neighborhoods. Absorbing-state corruption works best for text, while ordinal Gaussian corruption with a logistic output parameterization works best for CIFAR-10. An auxiliary denoising loss improves selected variants. The models remain behind strong autoregressive text models and continuous diffusion models in image sample quality; embedding-based corruption offers little or no benefit in the reported text experiments.

## Research Question

Can structured categorical corruption improve discrete diffusion generation while retaining tractable training, likelihood bounds, and efficient sampling across text and quantized images?

## Motivation

Uniform token replacement ignores relationships among categories. Nearby pixel intensities have ordinal structure, whereas text tokens can be replaced with a recognizable mask or perturbed through an embedding-neighborhood graph. Choosing the corruption process changes both the denoising task and the allowed reverse transitions, without requiring a continuous relaxation of the data.

## Contributions

- Generalizes categorical diffusion to structured transition matrices with tractable forward marginals and posteriors.
- Introduces an auxiliary clean-data cross-entropy loss and mutual-information-based noise schedules.
- Connects absorbing-state diffusion to masked language modeling and deterministic masking to autoregressive generation.
- Evaluates the framework on text8, LM1B, and CIFAR-10, and describes matrix representations that reduce storage costs for large vocabularies.

## Method

**Categorical forward process (Sections 2-3).** For a one-hot row vector $x_t$ over $K$ categories, let $[Q_t]_{ij}=q(x_t=j\mid x_{t-1}=i)$ and $\bar Q_t=Q_1\cdots Q_t$. Then

$$
q(x_t\mid x_0)=\operatorname{Cat}(x_t;x_0\bar Q_t),
\qquad
q(x_{t-1}\mid x_t,x_0)=\operatorname{Cat}\left(x_{t-1};
\frac{(x_tQ_t^\top)\odot(x_0\bar Q_{t-1})}{x_0\bar Q_t x_t^\top}\right).
$$

Corruption acts independently on sequence positions or image channels. The learned reverse distribution factorizes across output positions conditional on the entire noisy input, so the denoiser can use context. Training minimizes a variational upper bound on negative log-likelihood.

**Transition structure (Section 3.1, Appendix A.2).** Uniform diffusion replaces a category uniformly; [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]] replaces it with a persistent mask. Discretized Gaussian transitions favor nearby ordinal values and are normalized to have a uniform stationary distribution. Nearest-neighbor diffusion exponentiates a rate matrix derived from a symmetrized graph of pretrained token embeddings. For a connected graph this construction also has a uniform stationary distribution. The appendix describes band-diagonal transitions but does not evaluate them.

**Reverse model and objective (Sections 3.3-3.4).** A neural network predicts a clean-data distribution $\tilde p_\theta(\tilde x_0\mid x_t)$. The reverse step is parameterized by

$$
p_\theta(x_{t-1}\mid x_t)\propto
\sum_{\tilde x_0}q(x_{t-1},x_t\mid\tilde x_0)
\tilde p_\theta(\tilde x_0\mid x_t).
$$

This preserves the transition support and allows skipping diffusion steps at inference. For images, a discretized truncated logistic distribution adds an ordinal bias to clean-data prediction. The hybrid objective adds cross-entropy for predicting $x_0$ from $x_t$ to the variational loss, weighted by $\lambda$ (Equation 5).

**Schedules and scaling (Section 3.2, Appendices A.4 and A.7).** A mutual-information schedule approximately enforces $I(x_t;x_0)=(1-t/T)H(x_0)$ using empirical token frequencies. With a mask absent from clean data, this yields $\beta_t=1/(T-t+1)$. Uniform and absorbing transitions have compact closed-form cumulative products. Fixed-generator matrix exponentials provide another way to avoid storing a separate dense matrix for every timestep, although vocabulary-size costs remain substantial.

**Connections (Section 4, Appendix A.3).** Absorbing-state training reduces to a reweighted masked-token prediction objective. Independent masking is not exactly the same as selecting a fixed number of masked tokens. Deterministically masking one position at a time recovers an autoregressive objective. A one-step mixed corruption process gives a BERT-like denoising objective up to a parameter-independent prior term; this is an objective-level connection, not evidence that ordinary BERT supplies a complete unconditional diffusion generator.

## Experiments

**Text setup.** The main text models are 12-layer, approximately 70M-parameter Transformers trained for one million updates with batch size 512 and $T=1000$. text8 uses 27 categories and length-256 chunks. LM1B uses 8,192 SentencePiece tokens and packed length-128 sequences. Text results are reported over two seeds. The autoregressive baseline uses the same basic architecture and parameter count with causal masking.

**text8 (Table 1).** D3PM values below are reported NLL upper bounds in bits per character, with the source's uncertainty values retained. Timing is for a single length-256 sample in the reported setup.

| Model | Inference steps | NLL upper bound | Sample time (s) |
| --- | ---: | ---: | ---: |
| D3PM uniform | 1000 | $1.61\pm0.02$ | $3.6\pm0.4$ |
| D3PM nearest-neighbor | 1000 | $1.59\pm0.03$ | $3.1474\pm0.0002$ |
| D3PM absorbing, $\lambda=0.01$ | 1000 | $1.45\pm0.02$ | $3.4\pm0.3$ |
| D3PM absorbing, $\lambda=0.01$ | 256 | $1.47\pm0.03$ | $0.598\pm0.002$ |
| D3PM absorbing, $\lambda=0.01$ | 20 | $1.56\pm0.04$ | $0.0785\pm0.0003$ |

The authors' autoregressive Transformer reports exact NLL 1.23 and sample time 0.3570 seconds; Transformer-XL reports 1.08 with a larger architecture and context. Reduced-step sampling trades likelihood-bound quality for speed. The table supports a roughly 4.5-fold timing advantage for the 20-step absorbing model over the authors' Transformer, rather than the blanket nearly-20-fold claim in the prose. Nearest-neighbor corruption only narrowly improves on uniform corruption.

**LM1B (Table 2).** At 1000 steps, reported perplexities are $76.9\pm2.3$ for absorbing, $137.9\pm2.1$ for uniform, and $149.5\pm1.3$ for nearest-neighbor diffusion. Absorbing diffusion reaches $80.1\pm1.2$ at 128 steps and $83.6\pm6.1$ at 64 steps. The same-size autoregressive baseline reports 43.6; Transformer-XL reports 21.8. Perplexity is normalized by English-language words, including EOS, rather than by SentencePiece tokens. Appendix Table 7 gives 128-step sample times of 0.1983 seconds for absorbing and 6.6861 seconds for nearest-neighbor diffusion, versus 0.26 seconds for the Transformer. Table 2 labels its metric simply as perplexity; D3PM likelihood evaluation uses the variational framework.

**CIFAR-10 (Table 3).** Models use 1000 diffusion steps and a DDPM-style U-Net, trained for 1.5 million updates with batch size 128. FID and Inception Score use 50,000 samples. Results below are means and standard deviations across five training seeds; NLL entries are upper bounds in bits per dimension.

| Model | FID | NLL upper bound |
| --- | ---: | ---: |
| Uniform, variational loss | $51.27\pm2.15$ | $5.08\pm0.02$ |
| Absorbing, $\lambda=0.001$ | $30.97\pm0.64$ | $4.40\pm0.02$ |
| Gaussian, variational loss | $15.30\pm0.55$ | $3.966\pm0.005$ |
| Gaussian, $\lambda=0.001$ | $8.34\pm0.10$ | $3.975\pm0.006$ |
| Gaussian + logistic, $\lambda=0.001$ | $7.34\pm0.19$ | $3.435\pm0.007$ |

The best D3PM improves on the original DDPM's reported NLL bounds of 3.70 or 3.75, but its FID remains worse than the original DDPM trained with the simplified loss (3.17). Improved DDPM reports stronger bounds, including 2.94 with its variational loss. Gaussian corruption and the logistic parameterization provide the strongest image results, while the auxiliary loss alone improves FID without improving every NLL bound.

**Loss and schedule ablations (Appendix Tables 4-6).** On text8, Table 5 reports an NLL upper bound of 1.91 for uniform diffusion with $\lambda=0.01$, versus 1.61 with the variational loss alone. For absorbing diffusion, the corresponding bounds are 1.44 and 1.47; these appendix entries are separate from Table 1's two-seed summaries. In the smaller six-layer uniform model, Table 6 reports bounds of 2.37 with $\beta_t=1/(T-t+1)$, 1.73 with cosine scheduling, and 1.74 with mutual-information scheduling, all at 1000 steps. Appendix A.7 explicitly notes that the reciprocal schedule is not generally the mutual-information schedule for uniform corruption.

For uniform CIFAR-10 diffusion, changing from a linear to a cosine schedule improves FID from $79.86\pm1.64$ to $51.27\pm2.15$, while the NLL upper bound worsens from $4.99\pm0.03$ to $5.08\pm0.02$. Table 4 reports three linear-schedule seeds and four cosine-schedule seeds. This comparison reinforces that a schedule can improve sample quality without improving the likelihood bound.

## Limitations

- Text quality remains below strong autoregressive baselines; the LM1B study demonstrates feasibility at a larger vocabulary rather than parity with those models.
- Structure is task dependent: embedding-neighborhood corruption underperforms uniform diffusion on LM1B and is much slower. Image locality transfers more successfully than the tested token similarity.
- The auxiliary loss is not uniformly beneficial. It hurts uniform text diffusion; large weights can worsen image NLL and eventually FID. Skipping inference steps also degrades likelihood bounds.
- Naively storing transitions costs $O(K^2T)$ memory. Structured representations reduce storage, but general categorical transitions can remain expensive.
- IS and FID depend on an externally trained image model and do not establish quality across populations or use cases. Figure 3 explicitly includes cherry-picked progressive examples, though its final sample panel is uncurated.
- The supplied Markdown contains damaged equations and merged qualitative sample tables. This summary relies on legible method descriptions and quantitative tables, and does not interpret extraction artifacts as model behavior. No DOI or arXiv identifier for this paper is stated in the supplied source.

## Related Concepts

- [[concepts/diffusion-models|Diffusion Models]]
- [[concepts/discrete-diffusion-models|Discrete Diffusion Models]]
- [[concepts/absorbing-state-diffusion|Absorbing-State Diffusion]]

## Related Papers

- Sohl-Dickstein et al. (2015), "Deep unsupervised learning using nonequilibrium thermodynamics": earlier diffusion formulation, including binary variables (reference 43).
- Hoogeboom et al. (2021), "Argmax flows and multinomial diffusion: Towards non-autoregressive language models": uniform categorical diffusion baseline (reference 20).
- Ho, Jain, and Abbeel (2020), "Denoising diffusion probabilistic models": continuous image baseline and architecture (reference 19).
- Nichol and Dhariwal (2021), "Improved denoising diffusion probabilistic models": noise schedules and improved continuous baselines (reference 30).
- Ghazvininejad et al. (2019), "Mask-Predict: Parallel decoding of conditional masked language models": connection to generative masked-token prediction (reference 14).

[[index|Library home]]
