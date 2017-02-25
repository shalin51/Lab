package signochip.lab5;

import android.content.Intent;
import android.graphics.Camera;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RegisterActivity extends AppCompatActivity {

    private TrackGPS gps;
    double longitude;
    double latitude;
    Button  btnRegister,btnUpload,btnPickLocation;
    EditText etFirstname,etLastname;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btnRegister=(Button)findViewById(R.id.btnRegister);
        btnPickLocation=(Button)findViewById(R.id.btnLocation);
        btnUpload=(Button)findViewById(R.id.btnUpload);
        etFirstname= (EditText)findViewById(R.id.etFirstname) ;
        etLastname= (EditText)findViewById(R.id.etLastname) ;

        btnRegister.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent homeIntent=new Intent(v.getContext(),HomeActivity.class);
                startActivity(homeIntent);
            }
        });

        btnPickLocation.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                gps = new TrackGPS(RegisterActivity.this);
                if(gps.canGetLocation()){
                    longitude = gps.getLongitude();
                    latitude = gps .getLatitude();
                    Toast.makeText(getApplicationContext(),"Longitude:"+Double.toString(longitude)+"\nLatitude:"+Double.toString(latitude),Toast.LENGTH_SHORT).show();
                }
                else
                {
                    gps.showSettingsAlert();
                }
            }
        });

        btnUpload.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), CameraActivity.class);
                startActivity(intent);
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
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_register, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
