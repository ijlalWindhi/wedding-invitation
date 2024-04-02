declare type VisitorData = {
  uuid: string;
  name: string;
  address: string;
  category: string;
  session: string;
  numberOfVisitor: string;
};

declare type Visitors = VisitorData[];

declare type AddVisitorProps = {
  data: VisitorData;
  path: string;
  uuid: string;
};
