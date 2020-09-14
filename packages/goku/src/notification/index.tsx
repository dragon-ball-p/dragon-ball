import React from 'react';
import ReactDOM from 'react-dom';
import {
  NoticeContent,
  getUuid,
  NotificationRef as InnerNotificationRef,
  Notification as InnerNotification,
} from './notification';

export interface CreateNotificationInstanceProps {
  className?: string;
  style?: React.CSSProperties;
  container?: Element | DocumentFragment;
}

export interface NotificationInstance {
  notify: (notice: NoticeContent) => void;
  removeNotice: (key: React.Key) => void;
  destroy: () => void;
}

// const DURATION = 1; // sec
const notificationInstance: {
  [key: string]: NotificationInstance;
} = {};

export interface ArgsProps {
  content: React.ReactNode;
  key?: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

const createNotificationInstance = (props?: CreateNotificationInstanceProps): NotificationInstance => {
  const { container, ...others } = props || {};
  const root = container || document.createElement('div');
  document.body.appendChild(root);

  const ref = React.createRef<InnerNotificationRef>();
  ReactDOM.render(<InnerNotification ref={ref} {...others} />, root);
  return {
    notify(notice: NoticeContent): void {
      notice.key = notice.key || getUuid();
      ref.current?.notify(notice);
    },
    removeNotice(key: React.Key): void {
      ref.current?.removeNotice(key);
    },
    destroy(): void {
      ref.current?.destroy();
      ReactDOM.unmountComponentAtNode(root);
      if (root.parentNode) {
        root.parentNode.removeChild(root);
      }
    },
  };
};

const getNotificationInstance = (): NotificationInstance => {
  const cacheKey = `notification`;
  if (notificationInstance[cacheKey]) {
  } else {
    notificationInstance[cacheKey] = createNotificationInstance();
  }
  return notificationInstance[cacheKey];
};

interface NotificationAPI {
  open: (notice: NoticeContent) => void;
  close: (key: string) => void;
  destroy: () => void;
}

const api: NotificationAPI = {
  open: (notice: NoticeContent): void => {
    getNotificationInstance().notify(notice);
  },
  close(key: string) {
    Object.keys(notificationInstance).forEach((cacheKey) =>
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.removeNotice(key);
      }),
    );
  },
  // config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach((cacheKey) => {
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
  },
};

export default api;
