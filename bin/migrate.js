import _ from 'lodash';
import * as Models from '../models';

async function main() {
  const models = [
    Models.Users,
    Models.Restaurant,
    Models.Table,
    Models.Categories,
    Models.Menus,
    Models.QROrder,
    Models.Order,
    Models.OrderLiner,
  ];
  if (_.isArray(models)) {
    for (const model of models) {
      await model.sync({ alter: true });
    }
  }
  process.exit();
}

main().catch((e) => console.log(e));
