package signochip.lab6;

import android.app.Dialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.OpenableColumns;
import android.support.design.widget.FloatingActionButton;

import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import com.google.vr.sdk.widgets.pano.VrPanoramaView;
import com.google.vr.sdk.audio.GvrAudioEngine;
import com.google.vr.sdk.audio.GvrAudioSurround;

import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v4.app.NotificationCompat.WearableExtender;


import java.io.File;
import java.io.FilenameFilter;

public class MainActivity extends AppCompatActivity {

    Button btnPlay,btnStop,btnPause,btnLoadFile;
    public TextView txtFilename;
    Uri selectedfile;
    private static final String TAG = "Tag";
    private SeekBar seekBar;

    //In an Activity
    private String[] mFileList;
    private File mPath = new File(Environment.getExternalStorageDirectory() + "//yourdir//");
    private String mChosenFile;
    private static final String FTYPE = ".txt";
    private static final int DIALOG_LOAD_FILE = 1000;
    GvrAudioEngine audioEngine;
    int ambisonicId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);




        btnPlay=(Button)findViewById(R.id.btnPlay);
        btnStop=(Button)findViewById(R.id.btnStop);;
        btnPause=(Button)findViewById(R.id.btnPause);;
        btnLoadFile=(Button)findViewById(R.id.btnLoadFiles);
        txtFilename=(TextView)findViewById(R.id.txtFileName);


        btnLoadFile.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent()
                        .setType("*/*")
                        .setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select a file"), 123);

            }
        });

        btnPause.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                int notificationId = 101;
                // Build intent for notification content
                Intent viewIntent = new Intent(getApplicationContext(),MyDisplayActivity.class );
                PendingIntent viewPendingIntent =
                        PendingIntent.getActivity(getApplicationContext(), 0, viewIntent, 0);

                //Building notification layout
                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(getApplicationContext())
                                .setSmallIcon(1)
                                .setContentTitle("Pause")
                                .setContentText("Pause")
                                .setContentIntent(viewPendingIntent);

                // instance of the NotificationManager service
                NotificationManagerCompat notificationManager =
                        NotificationManagerCompat.from(getBaseContext());

                // Build the notification and notify it using notification manager.
                notificationManager.notify(notificationId, notificationBuilder.build());
               /* if( audioEngine.isSoundPlaying(ambisonicId))
                {
                    audioEngine.pauseSound(ambisonicId);

                }*/
            }
			audioEngine.pauseSound(ambisonicId);
        });

        btnStop.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                audioEngine.stopSound(ambisonicId);
				int notificationId = 101;
                // Build intent for notification content
                Intent viewIntent = new Intent(getApplicationContext(),MyDisplayActivity.class );
                PendingIntent viewPendingIntent =
                        PendingIntent.getActivity(getApplicationContext(), 0, viewIntent, 0);

                //Building notification layout
                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(getApplicationContext())
                                .setSmallIcon(1)
                                .setContentTitle("Stop")
                                .setContentText("Stop")
                                .setContentIntent(viewPendingIntent);

                // instance of the NotificationManager service
                NotificationManagerCompat notificationManager =
                        NotificationManagerCompat.from(getBaseContext());

                // Build the notification and notify it using notification manager.
                notificationManager.notify(notificationId, notificationBuilder.build());
               /* if( audioEngine.isSoundPlaying(ambisonicId))
                {
                    audioEngine.pauseSound(ambisonicId);

                }*/
            }
            }
        });

        btnPlay.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                audioEngine = new GvrAudioEngine(getBaseContext(), GvrAudioEngine.RenderingMode.BINAURAL_HIGH_QUALITY);

                final File file = new File(Environment.getExternalStorageDirectory(),"sample1");
                final String filename = file.getAbsolutePath();
                audioEngine.preloadSoundFile(filename);
                ambisonicId = audioEngine.createSoundObject(filename);
                audioEngine.playSound(ambisonicId,false);
				
				int notificationId = 101;
                // Build intent for notification content
                Intent viewIntent = new Intent(getApplicationContext(),MyDisplayActivity.class );
                PendingIntent viewPendingIntent =
                        PendingIntent.getActivity(getApplicationContext(), 0, viewIntent, 0);

                //Building notification layout
                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(getApplicationContext())
                                .setSmallIcon(1)
                                .setContentTitle("Play")
                                .setContentText("Play")
                                .setContentIntent(viewPendingIntent);

                // instance of the NotificationManager service
                NotificationManagerCompat notificationManager =
                        NotificationManagerCompat.from(getBaseContext());

                // Build the notification and notify it using notification manager.
                notificationManager.notify(notificationId, notificationBuilder.build());
               /* if( audioEngine.isSoundPlaying(ambisonicId))
                {
                    audioEngine.pauseSound(ambisonicId);

                }*/
            }
            }
        });



        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==123 && resultCode==RESULT_OK) {
             selectedfile = data.getData(); //The uri with the location of the file
            if(!selectedfile.equals(null))
            {
                txtFilename.setText(getFileName(selectedfile));
            }
        }
    }

    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                cursor.close();
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf('/');
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }
}
