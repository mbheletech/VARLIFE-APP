@@ .. @@
             <TouchableOpacity 
               style={styles.backButton}
               onPress={() => router.back()}
             >
               <ArrowLeft size={24} color="#FFFFFF" />
             </TouchableOpacity>
             
-            <Text style={styles.title}>Verify your student status</Text>
+            <Text style={styles.title}>Verify your student status</Text>
             <Text style={styles.subtitle}>
               We use SheerID to verify your enrollment at your institution
             </Text>
@@ .. @@
   title: {
     fontSize: 32,
     fontWeight: 'bold',
-    color: 'transparent',
+    color: '#FFFFFF',
+    marginBottom: 12,
   },