declare type VisitorData = {
  uuid: string;
  name: string;
  address: string;
  category: string;
  session: string;
  numberOfVisitor: string;
  isCheckIn: Boolean;
};

declare type Visitors = VisitorData[];

declare type SetVisitorProps = {
  data: VisitorData;
  path: string;
  uuid: string;
};
