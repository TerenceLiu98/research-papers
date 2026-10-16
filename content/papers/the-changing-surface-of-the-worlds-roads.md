---
title: "The changing surface of the world's roads"
type: paper
authors:
  - Sukanya Randhawa
  - Guntaj Randhawa
  - Clemens Langer
  - Francis Andorful
  - Benjamin Herfort
  - Daniel Kwakye
  - Omer Olchik
  - Sven Lautenbach
  - Alexander Zipf
year: 2026
doi: "10.1038/s41467-026-76234-8"
tags:
  - satellite-imagery
  - geospatial-ai
  - road-networks
  - human-development
  - infrastructure
---

## TL;DR

A fine-tuned Mask2Former model maps surface type for 95.5% of a 9.2-million-km global arterial road network using PlanetScope imagery from 2020 and 2024. Human validation yields 89.2% accuracy versus 64.7% for OpenStreetMap (OSM) surface tags. Rural pavedness and normalized paving change correlate with human development, while simulated removal of unpaved roads identifies national dependence on those connections. Surface and approximate width estimates also support local infrastructure and humanitarian analyses.

## Research Question

Can satellite imagery provide consistent, repeated measurements of road surface and width at global scale, and can these attributes reveal development disparities and structural transport vulnerability across national and local scales?

## Motivation

Road geometry alone does not describe infrastructure functionality. OSM surface attributes and street-view coverage are incomplete and can lag construction. In the arterial network examined here, 47.8% of road length previously lacked surface classification. Physical road attributes offer a finer-resolution complement to nighttime-light proxies for development, although the association between infrastructure and development does not establish causation.

## Contributions

- Produces a two-date global arterial surface dataset with first-order width estimates from 3-4 m PlanetScope imagery.
- Validates surface classifications independently of OSM tags and compares their accuracy.
- Relates static pavedness and change relative to remaining paving potential to human development.
- Connects road attributes to network redundancy and illustrates local applications in Ghana and flood-affected Pakistan.

## Method

### Surface Mapping

The arterial network comprises OSM motorway, trunk, primary, and secondary roads, including associated link types. Imagery acquisition covers approximately 13.9 million road locations. A Mask2Former semantic segmentation model is fine-tuned on manually labeled PlanetScope RGB imagery, with targeted augmentation and hard pixel mining. Segmentation masks undergo polygonization, integration with OSM geometry, directional filtering, and further classification to yield surface and approximate width attributes. Detailed training and post-processing specifications are delegated to supplementary material, which is not included in the supplied Markdown.

### Development Indicators

Pavedness is paved length divided by the sum of paved and unpaved lengths; unknown classifications are outside that denominator. Country-level measures are disaggregated into urban and rural networks and compared with the Subnational Human Development Index (SHDI). With paved shares expressed as fractions, normalized change is:

$$
\Delta P_{\mathrm{norm}} = \frac{P_{2024}-P_{2020}}{1-P_{2020}}\times100.
$$

The analysis excludes countries with baseline pavedness above 90% and less than 100 km of unpaved roads, and estimates a partial correlation controlling for baseline pavedness. Near saturation, the small denominator can amplify minor changes and classification errors.

### Connectivity and Local Applications

For each urban center, boundary-road intersections are reduced to at most three representative entry points using k-means, then snapped to the OSM graph. Multi-source Dijkstra searches establish baseline inter-urban reachability. Removing all predicted unpaved edges and repeating the analysis yields an unreachable ratio: newly disconnected urban-center pairs divided by originally reachable pairs. This is a hypothetical structural-dependence measure, not an observation of road closures.

The Ghana and Pakistan studies combine satellite-derived attributes with OSM and prior Mapillary classifications, extending local coverage beyond the global arterial scope. Pakistan's analysis overlays Copernicus flood extent and combines surface and width into a Humanitarian Passability Score. Exact score rules and width thresholds are not provided in the supplied main text.

## Experiments

### Classification Validation

An independent set of 2,628 road segments is human-annotated using sub-meter imagery, with geographically diverse sampling including lower-income regions (Methods; Figure 2).

| Measure | Reported result |
| --- | ---: |
| Model overall accuracy | 89.2% |
| OSM surface-tag accuracy | 64.7% |
| Model paved-road precision | 97.7% |
| Model paved-road recall | 90.4% |

The authors also report verification on 30,000 points drawn from 90,000 roads tagged unpaved in OSM. Qualitative examples include newly paved roads with outdated OSM tags, ambiguous compacted surfaces, mixed surfaces, and model errors.

### Infrastructure and Development

Table 1 reports regional means across countries: total pavedness is 97.4% in Europe and Central Asia, 96.9% in North America, and 63.1% in Sub-Saharan Africa. For Sub-Saharan Africa, rural pavedness is 61.4% versus 93.8% urban pavedness, with substantial between-country variation.

Country-level pavedness correlates with SHDI at $r=0.73$ overall, $r=0.74$ for rural roads, and $r=0.54$ for urban roads, all with $p<0.001$ (Figure 3). Normalized change has partial correlation $r=0.54$, $p<0.001$, after baseline adjustment and filtering (Figure 4). These results support an infrastructure-based development indicator; they do not estimate the effect of paving on development.

### Network and Case-Study Findings

The removal experiment finds greater dependence on unpaved inter-city links in parts of Sub-Saharan Africa, South America, and Southeast Asia than in mature paved networks (Figure 5). It does not measure realized economic losses.

In Ghana, the combined local data show paving rates of 84.6% for highway classes, 44.9% for urban road classes, and 5% for feeder classes. These are functional road categories, distinct from the urban/rural geographic split above. Neighborhood maps identify contrasts in Accra, including Redco, Macarthy Hill, and Sakumono Estate. The authors interpret these patterns alongside institutional responsibilities and investment priorities; the design does not isolate governance effects. Pakistan's flood-region maps illustrate how surface and approximate width can flag potential supply corridors and bottlenecks (Figure 8).

## Limitations

- The global coverage claim concerns selected arterial classes, not all roads. Local studies supplement this network with other data sources.
- Clouds, shadows, canopy, moisture, illumination, and sensor differences can create apparent temporal changes. Narrow roads and difficult imaging conditions can also increase unknown classifications and affect aggregate pavedness.
- Training emphasizes the Global South, and regional road typology can affect generalization. At 3-4 m resolution, width is approximate and individual lanes cannot be resolved.
- Two observed dates do not demonstrate continuous monitoring. Development correlations and local governance interpretations remain observational.
- Removing every unpaved road measures dependence under a specified scenario. It does not establish actual weather-related passability, and binary reachability omits costly detours on surviving routes.
- Width/passability thresholds and detailed model benchmarks are in unavailable supplementary material. The main text does not establish operational validation of the humanitarian score.

## Data and Code

The paper reports release of the road dataset through the [Heidelberg Institute for Geoinformation Technology's HDX collection](https://data.humdata.org/organization/heidelberg-institutefor-geoinformation-technology?q=Planet&ext_page_size=25) under CC BY-NC 4.0. PlanetScope imagery cannot be redistributed under its research license. The authors provide [analysis notebooks](https://gitlab.heigit.org/clemens_langer/planet-roads-plots) for pavedness analysis and OSM-model coverage comparisons; the text does not claim this is a full training-pipeline release.

## Related Concepts

- [[concepts/satellite-based-road-surface-mapping|Satellite-Based Road Surface Mapping]]: enriches road geometry with physical attributes and repeated measurements.
- [[concepts/road-network-vulnerability|Road Network Vulnerability]]: separates network dependence and redundancy from observed hazard impacts.

## Related Papers

- Randhawa et al. (2025), "Paved or unpaved? a deep learning derived road surface global dataset from Mapillary street-view imagery": the cited predecessor supplies complementary local coverage but has limited global and temporal reach.
- [[papers/structured-pixels-satellite-imagery-as-the-cause-in-causal-effect-estimation|Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]: a library comparison that treats imagery as a causal treatment; the present paper extracts physical attributes and studies associations. It is not a benchmark in this study.

[[index|Library home]]
