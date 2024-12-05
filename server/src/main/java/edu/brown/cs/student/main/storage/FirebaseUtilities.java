package edu.brown.cs.student.main.storage;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ExecutionException;

public class FirebaseUtilities implements StorageInterface {

  public FirebaseUtilities() throws IOException {
    // TODO: FIRESTORE PART 0:
    // Create /resources/ folder with firebase_config.json and
    // add your admin SDK from Firebase. see:
    // https://docs.google.com/document/d/10HuDtBWjkUoCaVj_A53IFm5torB_ws06fW3KYFZqKjc/edit?usp=sharing
    String workingDirectory = System.getProperty("user.dir");
    Path firebaseConfigPath =
        Paths.get(workingDirectory, "src", "main", "resources", "firebase_config.json");
    // ^-- if your /resources/firebase_config.json exists but is not found,
    // try printing workingDirectory and messing around with this path.

    FileInputStream serviceAccount = new FileInputStream(firebaseConfigPath.toString());

    FirebaseOptions options =
        new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

    FirebaseApp.initializeApp(options);
  }

  public List<Map<String, Object>> getCollection(String uid, String collection_id)
      throws InterruptedException, ExecutionException, IllegalArgumentException {

    Firestore db = FirestoreClient.getFirestore();
    List<Map<String, Object>> data = new ArrayList<>();

    if (uid != null) {
      // Retrieve documents from the specific user's collection
      CollectionReference dataRef = db.collection("users").document(uid).collection(collection_id);
      QuerySnapshot dataQuery = dataRef.get().get();
      for (QueryDocumentSnapshot doc : dataQuery.getDocuments()) {
        data.add(doc.getData());
      }
    } else {
      // List all collections for all users
      CollectionReference usersRef = db.collection("users");
      Iterable<DocumentReference> documents = usersRef.listDocuments();

      for (DocumentReference doc: documents ) {
        // Retrieve collections for each user document
        CollectionReference dataRef = doc.collection(collection_id);
        QuerySnapshot dataQuery = dataRef.get().get();

        for (QueryDocumentSnapshot docu : dataQuery.getDocuments()) {
          data.add(docu.getData());
        }

      }
    }

    return data;
  }

  @Override
  public void addDocument(String uid, String collection_id, String doc_id, Map<String, Object> data)
      throws IllegalArgumentException {
    if (uid == null || collection_id == null || doc_id == null || data == null) {
      throw new IllegalArgumentException(
          "addDocument: uid, collection_id, doc_id, or data cannot be null");
    }
    // adds a new document 'doc_name' to colleciton 'collection_id' for user 'uid'
    // with data payload 'data'.

    // TODO: FIRESTORE PART 1:
    // use the guide below to implement this handler
    // - https://firebase.google.com/docs/firestore/quickstart#add_data

    Firestore db = FirestoreClient.getFirestore();

    CollectionReference colRef = db.collection("users").document(uid).collection(collection_id);

    // asynchronously write data
    // result.get() blocks on response
    // 2: Write data to the collection ref
    ApiFuture<WriteResult> result = colRef.document(doc_id).set(data);
  }

  // clears the collections inside of a specific user.
  @Override
  public void clearUser(String uid) throws IllegalArgumentException {
    if (uid == null) {
      throw new IllegalArgumentException("removeUser: uid cannot be null");
    }
    try {
      // removes all data for user 'uid'
      Firestore db = FirestoreClient.getFirestore();

      // 1: Get a ref to the user document
      DocumentReference userDoc = db.collection("users").document(uid);

      /**
       // 2. Check if the document exists
       ApiFuture<DocumentSnapshot> future = userDoc.get();
       DocumentSnapshot document = future.get();
       if (!document.exists()) {
       throw new NoSuchElementException("User with uid " + uid + " does not exist.");
       }
       */

      // 2: Delete the user document
      deleteDocument(userDoc);
    } catch (NoSuchElementException e) {
      // Re-throw custom exception for missing user
      throw e;
    } catch (Exception e) {
      System.err.println("Error removing user : " + uid);
      System.err.println(e.getMessage());
    }
  }

  private void deleteDocument(DocumentReference doc) {
    // for each subcollection, run deleteCollection()
    Iterable<CollectionReference> collections = doc.listCollections();
    for (CollectionReference collection : collections) {
      deleteCollection(collection);
    }
    // then delete the document
    doc.delete();
  }

  // recursively removes all the documents and collections inside a collection
  // https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
  private void deleteCollection(CollectionReference collection) {
    try {

      // get all documents in the collection
      ApiFuture<QuerySnapshot> future = collection.get();
      List<QueryDocumentSnapshot> documents = future.get().getDocuments();

      // delete each document
      for (QueryDocumentSnapshot doc : documents) {
        doc.getReference().delete();
      }

      // NOTE: the query to documents may be arbitrarily large. A more robust
      // solution would involve batching the collection.get() call.
    } catch (Exception e) {
      System.err.println("Error deleting collection : " + e.getMessage());
    }
  }

}

