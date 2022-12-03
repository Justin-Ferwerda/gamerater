import { useRouter } from 'next/router';
import ReviewForm from '../../../components/ReviewForm';
import { useAuth } from '../../../utils/context/authContext';

export default function ReviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  return (
    <ReviewForm user={user} gameId={id} />
  );
}
