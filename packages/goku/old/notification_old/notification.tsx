import React from 'react';

let seed = 0;
const now = Date.now();
const DEFAULT_DURATION = 3;
const DEFAULT_FLASH = 1;

export const getUuid = (): string => `notification_${now}_${seed++}`;

export interface NotificationProps {
  className?: string;
  prefix?: string;
}

export interface NotificationRef {
  notify: (notice: NoticeContent) => void;
  removeNotice: (key: string) => void;
  destroy: () => void;
}

export interface NoticeContent {
  key: React.Key;
  duration?: number;
  content: React.ReactNode;
}

interface NoticeProps extends NoticeContent {
  handleClose: (key: React.Key) => void;
}
const Notice: React.FunctionComponent<NoticeProps> = (props) => {
  const { key, duration, handleClose } = props;
  const countdown = React.useRef<number>(0);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  React.useEffect(() => {
    const _duration = duration && duration > 0 ? duration : DEFAULT_DURATION;
    const delay = _duration - DEFAULT_FLASH;
    const normalStyle: React.CSSProperties = {
      transitionDelay: `${delay}s`,
      transitionDuration: `${DEFAULT_FLASH}s`,
      transitionProperty: 'opacity',
      transitionTimingFunction: 'linear',
      opacity: 1,
    };
    const hiddenStyle: React.CSSProperties = Object.assign({}, normalStyle, {
      opacity: 0,
    });
    const start = () => {
      setStyle(hiddenStyle);
      countdown.current = window.setTimeout(() => {
        handleClose(key);
      }, _duration);
    };
    const stop = () => {
      setStyle(normalStyle);
      if (countdown.current > 0) {
        window.clearTimeout(countdown.current);
        countdown.current = 0;
      }
    };
    const reset = () => {
      stop();
      start();
    };
    if (countdown.current > 0) {
      reset();
    } else {
      start();
    }
    return function (): void {
      stop();
    };
  }, [duration, handleClose, key]);

  return (
    <div className="notification" style={style}>
      {props.content}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 1,
  top: 0,
  left: 0,
  right: 0,
};

export const Notification = React.forwardRef((props: NotificationProps, ref: React.Ref<NotificationRef>) => {
  const [notices, setNotices] = React.useState<NoticeContent[]>([]);
  React.useImperativeHandle<NotificationRef, NotificationRef>(ref, () => ({
    notify: (notice: NoticeContent) => {
      notice.key = notice.key || getUuid();
      setNotices((preNotices) => preNotices.concat(notice));
    },
    removeNotice: (key: string) => {
      setNotices((preNotices) => preNotices.filter((notice) => notice.key !== key));
    },
    destroy: () => {
      setNotices([]);
    },
  }));
  const handleClose = React.useCallback((key: React.Key) => {
    setNotices((preNotices) => preNotices.filter((notice) => notice.key !== key));
  }, []);
  console.log('notification props ', props);
  return (
    <div style={containerStyle} {...props}>
      {notices.map((notice) => {
        const { key, ...others } = notice;
        return <Notice key={key} handleClose={handleClose} {...others}></Notice>;
      })}
    </div>
  );
});
