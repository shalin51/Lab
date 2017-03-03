package signochip.lab6;
import android.content.Context;

import com.google.vr.sdk.audio.GvrAudioEngine;
import com.google.vr.sdk.audio.GvrAudioSurround;
/**
 * Created by shali on 3/1/2017.
 */

public class Audio extends GvrAudioEngine{
    static {
        System.loadLibrary("vraudio_engine");
    }
    public Audio(Context context, int renderingMode) {
        super(context, renderingMode);
    }
    public abstract static class RenderingMode {

        /* Stereo panning of all sounds. This disables HRTF-based rendering. */
        public static final int STEREO_PANNING = 0;

        /* Renders all sounds over eight virtual loudspeakers arranged around
        the listener’s head. HRTF-based rendering is enabled. */
        public static final int BINAURAL_LOW_QUALITY = 1;

        /* Renders all sounds over 16 virtual loudspeakers arranged around
        the listener’s head. HRTF-based rendering is enabled. */
        public static final int BINAURAL_HIGH_QUALITY = 2;

    }

    @Override
    public void pause() {


    }

    @Override
    public void resume() {
        super.resume();
    }

    @Override
    public void update() {
        super.update();
    }
}
