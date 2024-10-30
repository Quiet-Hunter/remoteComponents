import React from 'react';

import { expose } from 'react-worker-components';
import { TextBox } from './TextBox';

const fib = (i:number):number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

const Hello = ({ count, children }:{count:number, children: any}) => {
  const fibNum = fib(count);
  return (
    <div>
      <div>Hello from worker: {fibNum}</div>
      <h1>Main TextBox</h1>
      {children}
      <h1>Worker TextBox</h1>
      <TextBox />
    </div>
  );
};

expose(Hello);