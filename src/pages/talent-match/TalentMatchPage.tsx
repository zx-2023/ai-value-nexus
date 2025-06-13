
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCandidates } from '../../store/slices/talentMatchSlice';
import CandidateCard from './components/CandidateCard';
import FilterDrawer from './components/FilterDrawer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const TalentMatchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredCandidates, loading } = useSelector((state: RootState) => state.talentMatch);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const renderSkeletonCards = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-card rounded-lg border p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
          </div>
          <Skeleton className="h-32 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">人才匹配列表</h1>
            <p className="text-muted-foreground">
              基于您的 SRD 为您推荐最适合的开发专家
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            筛选条件
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? renderSkeletonCards() : filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {!loading && filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">没有找到符合条件的候选人</p>
          </div>
        )}
      </div>

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};

export default TalentMatchPage;
