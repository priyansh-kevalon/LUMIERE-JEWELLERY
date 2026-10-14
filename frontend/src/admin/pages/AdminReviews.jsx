import { useState } from 'react';
import { Star, Trash2, MessageSquare, Send } from 'lucide-react';
import { Button, Card, EmptyState, IconButton, Modal, PageHeader, Textarea } from '../ui';
import { useToast } from '../toast';
import { deleteReview, updateReview, useReviews } from '../../data/adminData';

function Stars({ value }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={13}
          className={index <= value ? 'fill-[#C6A16A] text-[#C6A16A]' : 'text-[#4a4640]'}
        />
      ))}
    </span>
  );
}

export default function AdminReviews() {
  const reviews = useReviews();
  const toast = useToast();
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);

  const dateLabel = (value) =>
    new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const submitReply = () => {
    updateReview(replyTo.id, { reply: replyText.trim() });
    toast('Reply saved');
    setReplyTo(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Reviews" subtitle={`${reviews.length} reviews`} />

      {reviews.length === 0 ? (
        <EmptyState icon={<Star size={20} />} title="Nothing here" copy="No reviews yet." />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Stars value={review.rating} />
                  <p className="mt-2 text-[14px] text-[#f2ece8]">{review.title}</p>
                  <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#6f6a64]">
                    {review.author} · {review.productName} · {dateLabel(review.createdAt)}
                  </p>
                </div>
                <IconButton
                  label="Delete review"
                  className="hover:border-[#e07a7a]/50 hover:text-[#e0a08f]"
                  onClick={() => setPendingDelete(review)}
                >
                  <Trash2 size={14} strokeWidth={1.6} />
                </IconButton>
              </div>

              <p className="text-[12.5px] font-light leading-relaxed text-[#b7b1aa]">{review.body}</p>

              {review.reply ? (
                <div className="rounded-lg border border-white/10 bg-[#1c1a18] px-3.5 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#C6A16A]">Your reply</p>
                  <p className="mt-1 text-[12px] text-[#c9c2bb]">{review.reply}</p>
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => {
                    setReplyTo(review);
                    setReplyText(review.reply || '');
                  }}
                >
                  <MessageSquare size={13} strokeWidth={1.8} />
                  {review.reply ? 'Edit reply' : 'Reply'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(replyTo)}
        onClose={() => setReplyTo(null)}
        title="Reply to review"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReplyTo(null)}>
              Cancel
            </Button>
            <Button onClick={submitReply}>
              <Send size={13} strokeWidth={1.8} />
              Send Reply
            </Button>
          </>
        }
      >
        <p className="mb-3 text-[12px] text-[#8d867f]">
          Replying to <span className="text-[#c9c2bb]">{replyTo?.author}</span> on {replyTo?.productName}
        </p>
        <Textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Write a reply…" />
      </Modal>

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete review"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteReview(pendingDelete.id);
                toast('Review deleted');
                setPendingDelete(null);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-[#c9c2bb]">
          Permanently delete this review by {pendingDelete?.author}?
        </p>
      </Modal>
    </div>
  );
}
