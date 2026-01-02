# avvhafas-cards

Frontend to [avvhafas][avvhafas]

## Installation

### Install avvahafas

If not done already, install [avvhafas][avvhafas] first.

### Install Dashboard

- On the [HACS repositories](https://www.hacs.xyz/docs/use/repositories/dashboard/#browsing-repositories) page, add a new custom repository:

```plain
Repository: FoseFx/avvhafas-cards
Type: Dashboard
```

- On the same page: Search for `avvhafas-cards` and download the component.

### Create Trips

See [avvhafas][avvhafas]' README.

### Configure journey card

Create a new custom yaml card using

```yaml
type: custom:avvhafas-journeys
entity: sensor.<name of sensor>
```

Once create you can use the UI to configure the card.

## Disclaimers

This project is unaffiliated with the AVV.

No warranty of any kind, see LICENSE for details.

This project does not take feature requests.

[avvhafas]: https://github.com/FoseFx/avvhafas
