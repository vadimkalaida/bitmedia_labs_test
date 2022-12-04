import { IFilter } from "../../types/filter.types";

const filters : IFilter[] = [
  {
    value: 'from',
    name: "Sender Address"
  },
  {
    value: 'to',
    name: "Recipient's Address"
  },
  {
    value: 'transaction_id',
    name: 'Transaction ID'
  },
  {
    value: 'block_number',
    name: 'Block Number'
  }
];

export default filters;