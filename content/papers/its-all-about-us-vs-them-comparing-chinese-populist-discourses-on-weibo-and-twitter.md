---
title: "It's All About US vs THEM!: Comparing Chinese Populist Discourses on Weibo and Twitter"
type: paper
authors:
  - Yuan Zhang
  - Ralph Schroeder
year: 2024
doi: "10.1177/20563051241229659"
journal: "Social Media + Society"
tags:
  - populism
  - ultranationalism
  - china
  - political-communication
  - text-as-data
---

## TL;DR

In a keyword-selected sample of 50,000 Weibo posts and 50,000 Chinese-language Twitter posts from May 2022, Zhang and Schroeder identify 14.66% and 8.43%, respectively, as populist. Their analysis connects Chinese online populism with exclusionary ultranationalism: Weibo discourse emphasizes governmental accountability and national enemies, while Twitter discourse gives greater prominence to democracy and party representation. These are descriptive differences within the sampled discourse, not population prevalence estimates or identified platform effects.

## Research Question

How do Chinese populist discourses on Weibo and Twitter differ in topics, semantic content, and the accounts that originate and redistribute messages?

## Motivation

Anti-elite populism can appear puzzling in a political system that restricts criticism of party leaders. The authors argue that criticism can instead target government officials, public intellectuals, and elites accused of favoring outsiders. Studying the intersection of [[concepts/populism-and-ultranationalism|populism and ultranationalism]] reveals how appeals to the people coexist with support for the party and hostility toward internal and external enemies.

## Contributions

- Develops a comparative account of Chinese online populism centered on the people and four targeted categories: foreigners, Westerners, public intellectuals, and political elites.
- Combines supervised text classification, topic modeling, multiple correspondence analysis (MCA), and account categorization to compare domestic and transnational online discussion.
- Distinguishes appeals for governmental accountability from demands for democratic representation, and examines grassroots production alongside reposting.

## Method

### Corpus and Annotation

The authors initially select three Weibo hot events for each of four enemy categories, primarily from 2022. Manual keyword coding and TF-IDF ranking produce search terms, including an additional people-oriented category. Applying the same terms on both platforms for 1-31 May 2022 retrieves 241,920 Weibo posts and 560,770 Twitter posts. Computational constraints motivate randomly selecting 50,000 posts per platform. The initial keyword vocabulary comes exclusively from Weibo.

Five coders manually label 20,000 posts as populist or non-populist. The paper reports agreement with author labels ranging from 80.70% to 98.30% on the full Weibo data and 82.50% to 99.50% on Twitter, with additional checks for disagreements. Each platform's 10,000 labeled posts is split 80%/10%/10% into training, validation, and test sets. URLs, usernames, and stop words are removed before classification. Chinese RoBERTa, BERT, and FastText representations are compared with logistic regression; the selected classifier labels the remaining 80,000 posts.

### Topics, Semantics, and Accounts

Latent Dirichlet allocation extracts topics from populist posts within the target categories. Topic counts combine coherence-based evaluation and human judgment; repeated topics are consolidated and names assigned from words and example posts. MCA jointly maps platform, target group, and topic categories. The authors interpret its first two axes as destructive versus constructive rhetoric and populist versus ultranationalist emphasis.

Account categories use platform labels and follower counts: journalism, public sector, professionals, we-media, and individuals on Weibo; journalism, we-media, and individuals on Twitter. We-media is a pragmatic high-follower category, using the top 10% as an influence threshold. Original posters are operationally called agenda setters and reposters audiences; this does not measure unobserved readers or demonstrate persuasion.

## Experiments

This is an observational comparison with classifier evaluation, rather than an intervention experiment.

### Classification Results

Table 1 reports held-out accuracy:

| Representation plus logistic regression | Weibo | Twitter |
| --- | ---: | ---: |
| RoBERTa | 86.00% | 92.00% |
| BERT | 85.00% | 91.90% |
| FastText | 78.90% | 90.60% |

The resulting labeled corpora contain 14.66% populist posts on Weibo and 8.43% on Twitter. Public-intellectual posts have the highest within-category populist proportion on both platforms, followed by foreigner-related posts. These proportions refer to the keyword-selected samples.

### Topics and Semantic Patterns

The authors identify eight consolidated topics on Weibo and seven on Twitter (Table 2 and Figure 4):

| Distribution in the extracted topic inventory | Topics |
| --- | --- |
| Both platforms | Corruption, betrayal, super-national treatment, immoral West |
| Weibo-specific | Popular sovereignty, human rights, accountability, cultural invasion |
| Twitter-specific | Democracy, liberal democracy, party |

These labels summarize extracted topics; their absence from a platform's inventory does not demonstrate that the underlying ideas are absent there. The two MCA dimensions explain 13.3% and 12.2% of variation. The authors interpret Weibo as more ultranationalist and enemy-oriented, and Twitter as relatively more oriented toward the people and democracy. Both contain antagonistic and constructive rhetoric, with substantial overlap rather than a categorical platform divide.

### Producers and Reposters

The account analysis reports ordinary individuals as 96.02% of populist disseminators on Weibo and 93.57% on Twitter; we-media accounts represent 2.92% and 5.55%, respectively. Weibo populist messages more often originate with proactive posters, whereas Twitter messages more often redistribute others' posts. The authors interpret this as consistent with flatter production on Weibo and more concentrated influence on Twitter, without directly estimating a causal influence process.

## Limitations

- The one-month window reflects salient events of May 2022. Weibo-derived search terms condition both samples, so the results cannot establish platform-wide or national prevalence.
- User demographics and residence cannot be verified, and account labels and follower counts are proxies. The authors' explanations involving mainland versus overseas users remain hypotheses.
- Censorship losses are unknown, especially on Weibo; possible bots and omitted platforms such as Zhihu and BiliBili further limit coverage.
- Manual coding and automated classification introduce measurement error. Overall accuracy alone does not establish precision or recall for the minority populist class or equal measurement quality across platforms.
- The first two MCA axes capture 25.5% of variation; their substantive labels are interpretations of an exploratory representation. The supplied Markdown references supplementary coding criteria and diagnostics but does not include those materials.
- Differences in platform affordances, censorship, and audiences are not separately identified. Claims about democratic responsiveness, exclusion, or political stability are proposed implications rather than tested outcomes.

## Related Concepts

- [[concepts/populism-and-ultranationalism|Populism and Ultranationalism]]
- [[concepts/right-wing-populist-mobilisation|Right-Wing Populist Mobilisation]]
- [[concepts/media-ecology|Media Ecology]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]

## Related Papers

- Mudde (2004), "The Populist Zeitgeist": Cited conceptual foundation for the antagonism between the people and corrupt elites.
- Huguet-Cabot et al. (2021), "Us vs. Them: A Dataset of Populist Attitudes, News Bias and Emotions": Cited computational precedent for measuring populist discourse.
- Zhang (2020), "Right-Wing Populism with Chinese Characteristics? Identity, Otherness and Global Imaginaries in Debating World Politics Online": Cited account of Chinese online populist identity and anti-Western discourse.
- [[papers/dynamics-and-determinants-of-right-wing-populist-mobilisation-in-germany|Dynamics and determinants of right-wing populist mobilisation in Germany]]: Related library reading on street mobilisation; it studies a different outcome and is not cited in this article.
- [[papers/measuring-agenda-setting-in-interactive-political-communication|Measuring Agenda Setting in Interactive Political Communication]]: Related library reading that measures sustained topic redirection, providing a contrast with this paper's original-post versus repost distinction; not cited in this article.

Source: [Published article](https://doi.org/10.1177/20563051241229659). This note is based on the supplied parsed article text.

[[index|Library home]]
