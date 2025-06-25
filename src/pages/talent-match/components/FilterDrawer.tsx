
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setFilters } from '../../../store/slices/talentMatchSlice';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.talentMatch);

  const techStacks = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 
    'TypeScript', 'PHP', 'Go', 'React Native', 'Flutter'
  ];

  const timezones = [
    { label: '不限', value: 'any' },
    { label: 'UTC-8 (美西)', value: 'UTC-8' },
    { label: 'UTC-5 (美东)', value: 'UTC-5' },
    { label: 'UTC+0 (欧洲)', value: 'UTC+0' },
    { label: 'UTC+8 (亚洲)', value: 'UTC+8' },
  ];

  const handleTechStackChange = (tech: string, checked: boolean) => {
    const newTechStack = checked
      ? [...filters.techStack, tech]
      : filters.techStack.filter(t => t !== tech);
    
    dispatch(setFilters({ techStack: newTechStack }));
  };

  const resetFilters = () => {
    dispatch(setFilters({
      techStack: [],
      timezone: 'any',
      maxRate: 200,
      minRating: 0,
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>筛选条件</SheetTitle>
          <SheetDescription>
            根据您的需求筛选最合适的候选人
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div>
            <Label className="text-base font-medium">技术栈</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {techStacks.map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <Checkbox
                    id={tech}
                    checked={filters.techStack.includes(tech)}
                    onCheckedChange={(checked) => 
                      handleTechStackChange(tech, checked as boolean)
                    }
                  />
                  <Label htmlFor={tech} className="text-sm">{tech}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">时区</Label>
            <Select 
              value={filters.timezone || 'any'} 
              onValueChange={(value) => dispatch(setFilters({ timezone: value }))}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="选择时区" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">
              最高时薪: ${filters.maxRate}/小时
            </Label>
            <Slider
              value={[filters.maxRate]}
              onValueChange={(value) => dispatch(setFilters({ maxRate: value[0] }))}
              max={200}
              min={20}
              step={5}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$20</span>
              <span>$200</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">
              最低评分: {filters.minRating}%
            </Label>
            <Slider
              value={[filters.minRating]}
              onValueChange={(value) => dispatch(setFilters({ minRating: value[0] }))}
              max={100}
              min={0}
              step={5}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              重置
            </Button>
            <Button onClick={onClose} className="flex-1">
              应用筛选
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
