export interface IHeaders {
  name: string,
  width: string,
  maxSize: number,
  link: string
}

const headers : IHeaders[] = [
  {
    name: 'Block number',
    width: '10%',
    maxSize: 10,
    link: ''
  },
  {
    name: 'Transaction ID',
    width: '12%',
    maxSize: 12,
    link: 'https://etherscan.io/tx/'
  },
  {
    name: 'Sender address',
    width: '13%',
    maxSize: 13,
    link: ''
  },
  {
    name: "Recipient's address",
    width: '14%',
    maxSize: 15,
    link: ''
  },
  {
    name: "Block confirmations",
    width: '11%',
    maxSize: 0,
    link: ''
  },
  {
    name: "Date",
    width: '10%',
    maxSize: 0,
    link: ''
  },
  {
    name: "Value",
    width: '20%',
    maxSize: 0,
    link: ''
  },
  {
    name: "Transaction Fee",
    width: '10%',
    maxSize: 0,
    link: ''
  },
];

export default headers;