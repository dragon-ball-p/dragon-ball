import React from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { Placement, getPlacementClass } from '../config/placement-type';
import { PopoverContext, usePopoverContext, Trigger } from './context';
import { PopoverTrigger } from './popover-trigger';
import { PopoverContent } from './popover-content';

export interface PopoverProps {
  color?: ColorType;
  trigger?: Trigger;
  visible?: boolean;
  placement?: Placement;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
}

export interface Popover extends React.FC<React.HTMLAttributes<HTMLElement> & PopoverProps> {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
}

export const Popover: Popover = (props) => {
  const {
    color,
    trigger = 'hover',
    visible = false,
    placement = 'bottomLeft',
    onVisibleChange = function () {
      // do sth.
    },
    className,
    children,
    ...others
  } = props;

  const ctx = usePopoverContext({
    placement,
    visible,
    trigger,
    onVisibleChange,
  });

  const open = (): void => {
    if (trigger !== 'hover') return;
    if (ctx.visible) return;
    ctx.triggerVisible(true);
  };
  const close = (): void => {
    if (trigger !== 'hover') return;
    if (!ctx.visible) return;
    ctx.triggerVisible(false);
  };

  const clz = Classnames(
    'dropdown',
    {
      'is-active': ctx.visible,
    },
    getColorClass(color),
    getPlacementClass(ctx.placement),
    className,
  );

  console.log('Popover::render::');
  return (
    <PopoverContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close} {...others}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Conte = PopoverConte;

Popover.displayName = 'Popover';
Popover.defaultProps = {
  trigger: 'hover',
  visible: false,
  placement: 'bottomLeft',
  onVisibleChange: function () {
    // do sth.
  },
};
