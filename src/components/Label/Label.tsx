import * as React from 'react';

export interface LabelProps {
  text: string;
}

export const Label: React.FunctionComponent<LabelProps> = ({ text, children }) => (
  <React.Fragment>
    <label>{text}</label>
    {children}
  </React.Fragment>
);
