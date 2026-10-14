import { useState } from 'react';
import { Check, KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { Button, Card, Field, PageHeader, SectionTitle, TextInput } from '../ui';
import { useToast } from '../toast';
import { updateAdminProfile, changeAdminPassword } from '../../services/adminAuth';

const metaLine = (value) =>
  value ? new Date(value).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export default function AdminProfile({ session, onSessionChange }) {
  const toast = useToast();
  const [profile, setProfile] = useState({ name: session?.name || '', email: session?.email || '' });
  const [profileStatus, setProfileStatus] = useState('idle');
  const [profileError, setProfileError] = useState('');

  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdStatus, setPwdStatus] = useState('idle');
  const [pwdError, setPwdError] = useState('');

  const saveProfile = async (event) => {
    event.preventDefault();
    if (profileStatus === 'saving') return;
    setProfileError('');
    if (!profile.name.trim()) {
      setProfileError('Name is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      setProfileError('Enter a valid email address.');
      return;
    }
    setProfileStatus('saving');
    try {
      const merged = await updateAdminProfile({ name: profile.name.trim(), email: profile.email.trim() });
      onSessionChange?.(merged);
      toast('Profile updated');
      setProfileStatus('saved');
      setTimeout(() => setProfileStatus('idle'), 1600);
    } catch (error) {
      setProfileStatus('idle');
      setProfileError(error.message || 'Could not update profile.');
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    if (pwdStatus === 'saving') return;
    setPwdError('');
    if (!pwd.current) {
      setPwdError('Enter your current password.');
      return;
    }
    if (pwd.next.length < 6) {
      setPwdError('New password must be at least 6 characters.');
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdError('New passwords do not match.');
      return;
    }
    setPwdStatus('saving');
    try {
      await changeAdminPassword({ currentPassword: pwd.current, newPassword: pwd.next });
      toast('Password updated');
      setPwd({ current: '', next: '', confirm: '' });
      setPwdStatus('idle');
    } catch (error) {
      setPwdStatus('idle');
      setPwdError(error.message || 'Could not update password.');
    }
  };

  const initial = (session?.name || 'A').slice(0, 1).toUpperCase();
  const update = (setter, key) => (event) => setter((current) => ({ ...current, [key]: event.target.value }));

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Your administrator account and security" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C6A16A]/50 bg-[#1c1a18] font-serif text-[22px] text-[#d8b47e]">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] text-[#f2ece8]">{session?.name}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d867f]">{session?.role}</p>
            </div>
          </div>

          <SectionTitle>Admin Details</SectionTitle>
          <form onSubmit={saveProfile} className="space-y-4">
            <Field label="Full Name">
              <TextInput value={profile.name} onChange={update(setProfile, 'name')} placeholder="Store Administrator" />
            </Field>
            <Field label="Email Address">
              <TextInput type="email" value={profile.email} onChange={update(setProfile, 'email')} placeholder="admin@lumiere.com" />
            </Field>
            <Field label="Role" hint="The owner role is fixed for this account.">
              <TextInput value={session?.role || 'Owner'} disabled className="text-[#8d867f]" />
            </Field>

            {profileError ? <p className="text-[12px] text-[#e0a08f]">{profileError}</p> : null}

            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-[#6f6a64]">Signed in {metaLine(session?.signedInAt)}</p>
              <Button type="submit" disabled={profileStatus === 'saving'}>
                {profileStatus === 'saving' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Saving
                  </>
                ) : profileStatus === 'saved' ? (
                  <>
                    <Check size={15} strokeWidth={2.4} />
                    Saved
                  </>
                ) : (
                  'Save Details'
                )}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A16A]/40 text-[#C6A16A]">
              <KeyRound size={15} strokeWidth={1.7} />
            </span>
            <SectionTitle>Reset Password</SectionTitle>
          </div>

          <form onSubmit={savePassword} className="space-y-4">
            <Field label="Current Password">
              <TextInput
                type="password"
                autoComplete="current-password"
                value={pwd.current}
                onChange={update(setPwd, 'current')}
                placeholder="Enter current password"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="New Password">
                <TextInput
                  type="password"
                  autoComplete="new-password"
                  value={pwd.next}
                  onChange={update(setPwd, 'next')}
                  placeholder="At least 6 characters"
                />
              </Field>
              <Field label="Confirm Password">
                <TextInput
                  type="password"
                  autoComplete="new-password"
                  value={pwd.confirm}
                  onChange={update(setPwd, 'confirm')}
                  placeholder="Repeat new password"
                />
              </Field>
            </div>

            {pwdError ? <p className="text-[12px] text-[#e0a08f]">{pwdError}</p> : null}

            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-[#6f6a64]">
                <ShieldCheck size={13} strokeWidth={1.6} className="text-[#C6A16A]" />
                Minimum 6 characters
              </span>
              <Button type="submit" disabled={pwdStatus === 'saving'}>
                {pwdStatus === 'saving' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Updating
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
