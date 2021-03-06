import React, { useContext, useEffect, useRef } from 'react';
import { Context as ModalContext } from './modal-context';
import composeClasses from '../../utils/compose-classes';
import './modal.css';

export default function Modal () {
  const ctx = useContext(ModalContext);
  const elem = useRef<HTMLDivElement>(null);

  const close = () => {
    ctx.set?.(null);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    if (!ctx.val) close();
    else {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
      });

      // eslint-disable-next-line func-names
      elem?.current?.addEventListener('click', function (e) {
        if (e.target === this) close();
      });
    }
  }, [ctx.val]);

  return (
    <div ref={elem} className={`modal-overlay${ctx.val ? ' open' : ''}`}>
      <button type="button" className="modal-close" onClick={close}>✖</button>
      <div className={composeClasses('modal', ctx.val?.props.modalClass || '')}>
        {ctx.val?.component || ''}
      </div>
    </div>
  );
}
