import React, { useState, createContext } from 'react';
import type { ComponentProps } from '../../types';

type ModalContextValue = {
  component: JSX.Element,
  props: ModalContextValueProps,
};

type ModalContextValueProps = {
  modalClass: string|'',
};

const defaultModalContextValueProps: ModalContextValueProps = {
  modalClass: '',
};

export const Context = createContext<{
  val: ModalContextValue|null,
  set:React.Dispatch<any>|null,
}>({ val: null, set: null });

export default function ModalContext ({ children }: ComponentProps<{}>) {
  const [component, setComponent] = useState<ModalContextValue|null>(null);
  const val = {
    val: component,
    set: (data: Partial<ModalContextValue> = {}) => {
      if (data === null) setComponent(null);
      else if (!data.component) throw new Error('"component" property of modal window is required.');
      else setComponent({
        component: data.component,
        props: { ...defaultModalContextValueProps, ...(data.props ? data.props : {}) },
      });
    },
  };

  return (
    <Context.Provider value={val}>
      {children}
    </Context.Provider>
  );
}
