import { BazelCommander } from './BazelCommander';
import { exec } from './exec';

export const BazelApi = new BazelCommander(exec);
