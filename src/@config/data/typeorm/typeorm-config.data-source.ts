import { DataSource, DataSourceOptions } from 'typeorm';

import typeormConfig from './typeorm-config';

const config = typeormConfig('src') as DataSourceOptions;

const dataSource = new DataSource(config);

export default dataSource;
