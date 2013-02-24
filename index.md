###Instructions:

Setup WiFi:

From [here](http://svay.com/blog/setting-up-a-wifi-connection-on-the-raspberrypi/)
	
/etc/network/interfaces
	
	auto lo
	
	iface lo inet loopback
	iface eth0 inet dhcp
	
	#Start wpa_supplicant daemon automatically (equivalent to auto?)
	
	allow-hotplug wlan0
	iface wlan0 inet manual
	
		#Because we don't specify wpa-driver, defaults to wext
		#We use wpa-roam which adds a layer on top of ifupdown to 
		#find new networks as they arrive. Not strictly necessary,
		#but helpful when moving from network to network
		
		wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
	
	#Each wpa_supplicant can optionally have an id_str
	#which will allow us to configure each interface here.
	#For simplicity, we just take all and then make them into
	#dhcp connections. Alternatively, we could do static IPs.
	#This line should always be present, however
	
	iface default inet dhcp
	
Add the results of wpa_passphrase to the /etc/wpa_supplicant/wpa_supplicant.conf file:
 	
 	wpa_passphrase 'SSID' 'passphrase'
	
Change hostname:

/etc/hosts

/etc/hostname
	
Get the python pyface packages:

	$ git clone https://github.com/thomasmacpherson/piface.git

Install using

	$ cd piface/python/
	$ sudo python setup.py install
	
Make sure permissions are good

	sudo piface/scripts/spidev-setup
	sudo reboot
	
Test the code works
	
	import piface.pfio
	piface.pfio.init()
	led1 = piface.pfio.LED(1)	
	led1.turn_on()
	led1.turn_off()

Create a new server.py on the py, containing the following:

	import piface.pfio
	import BaseHTTPServer
	from time import sleep

	piface.pfio.init()
	relay = piface.pfio.Relay(1)

	class PiServer(BaseHTTPServer.BaseHTTPRequestHandler):
	  def do_GET(self):
	    relay.turn_on()
	    sleep(0.5)
	    relay.turn_off()
	    print "Toggle"
	    self.send_response(200)

	httpd = BaseHTTPServer.HTTPServer(('', 8000), PiServer)
	httpd.serve_forever()

... and run it:

	nohup python server.py &

Then on a client computer, run curl to toggle relay:

	curl http://visserpi:8000
	


