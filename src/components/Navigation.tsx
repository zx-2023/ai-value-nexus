import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { switchRole } from '../store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, Users, Code, Home, Settings, FileText } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, currentRole } = useSelector((state: RootState) => state.auth);

  const enterpriseNavItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/ai-studio', label: 'AI 工坊', icon: MessageSquare },
    { path: '/talent-match', label: '人才匹配', icon: Users },
    { path: '/project-console', label: '项目控制台', icon: Settings },
  ];

  const developerNavItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/market-demand', label: '市场需求', icon: Users },
    { path: '/developer-workstation', label: '工作台', icon: Code },
    { path: '/sandbox', label: '沙箱 IDE', icon: Code },
    { path: '/ai-resume', label: 'AI 简历', icon: FileText },
  ];

  const navItems = currentRole === 'enterprise' ? enterpriseNavItems : developerNavItems;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleRoleSwitch = (role: 'enterprise' | 'developer') => {
    dispatch(switchRole(role));
    // 角色切换时跳转到对应的默认页面
    if (role === 'enterprise') {
      navigate('/ai-studio'); // 企业版默认跳转到AI工坊
    } else {
      navigate('/developer-workstation'); // 开发者版默认跳转到工作台
    }
  };

  return (
    <nav className="bg-card border-b px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-primary">
            AI 协作平台
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                className={isActive(item.path) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                asChild
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentRole === 'enterprise' ? '企业用户' : '开发者'}
                    </p>
                  </div>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch('enterprise')}
                  className={currentRole === 'enterprise' ? 'bg-muted' : ''}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  企业控制台
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleSwitch('developer')}
                  className={currentRole === 'developer' ? 'bg-muted' : ''}
                >
                  <Code className="mr-2 h-4 w-4" />
                  开发者工作台
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  个人设置
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
