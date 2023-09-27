import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Ice编程出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ice plant',
          title: '知识星球',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'Design Index',
          title: '编程导航',
          href: 'https://chat.julianwl.com/chat',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />Ice编程 GitHub</>,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
