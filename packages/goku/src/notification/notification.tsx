import React from 'react';

let seed = 0;
const now = Date.now();

export const getUuid = (): string => `notification_${now}_${seed++}`;

export interface NotificationProps {
  className?: string;
  prefix?: string;
}

export interface NotificationRef {
  notify: (notice: NoticeContent) => void;
  removeNotice: (key?: React.Key) => void;
  destroy: () => void;
}

export interface NoticeContent {
  key?: React.Key;
  content: React.ReactNode;
}

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
    removeNotice: (key: React.Key) => {
      setNotices((preNotices) => preNotices.filter((notice) => notice.key !== key));
    },
    destroy: () => {
      setNotices([]);
    },
  }));
  console.log('notification props ', props);
  return (
    <div style={containerStyle} {...props}>
      {notices.map((notice) => (
        <div key={notice.key} className="notification">
          {notice.content}
        </div>
      ))}
    </div>
  );
});
