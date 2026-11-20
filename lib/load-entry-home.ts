import { loadPetHome, type HomePet, type HomeRecent } from "./pet-first-archive-data.ts";
import { ensureOwnerRow } from "./pet-first-archive-server.ts";
import { createSupabaseAuthServerClient } from "./supabase-auth-server.ts";

export type EntryHomeData = {
  signedIn: boolean;
  pets: HomePet[];
  recent: HomeRecent[];
};

// Request-level cache to prevent duplicate fetches during same request
// This is crucial for performance when multiple pages/components load entry home data
let cachedEntryHome: EntryHomeData | null = null;
let cacheKey: string | null = null;

export async function loadEntryHome(): Promise<EntryHomeData> {
  const supabase = await createSupabaseAuthServerClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!supabase || !user) {
    return { signedIn: false, pets: [], recent: [] };
  }

  // Check request-level cache (same user within same request)
  if (cacheKey === user.id && cachedEntryHome !== null) {
    return cachedEntryHome;
  }

  // Reset cache for new user
  cacheKey = user.id;

  await ensureOwnerRow(supabase, user.id);
  const home = await loadPetHome(supabase, user.id);
  const result = { signedIn: true, pets: home?.pets ?? [], recent: home?.recent ?? [] };

  // Store in request-level cache
  cachedEntryHome = result;

  return result;
}
